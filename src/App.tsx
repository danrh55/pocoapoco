import { useEffect, useRef, useState } from "react";
import * as api from "./api";
import { transcript } from "./api";
import type { Analysis, Message, Recast, Turn } from "./types";

/** Marks the worked span inside the learner's own sentence. */
function Marked({ text, span }: { text: string; span: string }) {
  const at = text.indexOf(span);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark>{span}</mark>
      {text.slice(at + span.length)}
    </>
  );
}

function Recasts({ recasts }: { recasts: Recast[] }) {
  if (recasts.length === 0) return null;
  return (
    <ul className="recasts">
      {recasts.map((r, i) => (
        <li key={i}>
          <s>{r.span}</s> <span className="arrow">→</span> <b>{r.correction}</b>
        </li>
      ))}
    </ul>
  );
}

function PartnerMessage({
  message,
  onWord,
  onReword,
  rewording,
}: {
  message: Extract<Message, { role: "partner" }>;
  onWord: (word: string, sentence: string) => void;
  onReword: () => void;
  rewording: boolean;
}) {
  const shown = message.reworded ?? message.text;
  return (
    <div className="msg partner">
      <p className="bubble">
        {shown.split(/(\s+)/).map((tok, i) =>
          /\S/.test(tok) ? (
            <button
              key={i}
              className="word"
              onClick={() => onWord(tok.replace(/[.,¿?¡!;:"']/g, ""), shown)}
            >
              {tok}
            </button>
          ) : (
            tok
          ),
        )}
      </p>
      <div className="msg-tools">
        {message.reworded && <span className="reworded-note">reworded</span>}
        {!message.reworded && (
          <button className="ghost" onClick={onReword} disabled={rewording}>
            {rewording ? "…" : "otra vez, más simple"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [turn, setTurn] = useState<Turn>({ phase: "idle" });
  const [input, setInput] = useState("");
  const [meant, setMeant] = useState("");
  const [word, setWord] = useState<{ word: string; examples: string[] | null } | null>(null);
  const [rewordingAt, setRewordingAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, turn]);

  const fail = (e: unknown) => {
    setError(e instanceof Error ? e.message : String(e));
    setTurn({ phase: "idle" });
  };

  const submit = async () => {
    const raw = input.trim();
    if (!raw) return;
    setError(null);
    setInput("");
    setTurn({ phase: "filling" });
    try {
      const { filled } = await api.fillBrackets(raw);
      setTurn({ phase: "reading", text: filled });
      const { readable, english } = await api.readIntent(filled);
      setMeant("");
      setTurn({ phase: "intent", text: filled, english, readable });
    } catch (e) {
      fail(e);
    }
  };

  const confirmIntent = async (intent: string) => {
    if (turn.phase !== "intent") return;
    const { text } = turn;
    setTurn({ phase: "analyzing", text, intent });
    try {
      const analysis = await api.analyze(text, intent, transcript(messages));
      if (!analysis.worked) return resolve(text, analysis.corrected, analysis.recasts);
      setTurn({
        phase: "correcting",
        text,
        intent,
        analysis,
        attempt: 1,
        draft: text,
        checking: false,
        missed: false,
      });
    } catch (e) {
      fail(e);
    }
  };

  const attempt = async () => {
    if (turn.phase !== "correcting" || !turn.analysis.worked) return;
    const { draft, analysis, intent, attempt: n } = turn;
    const worked = turn.analysis.worked;
    setTurn({ ...turn, checking: true });
    try {
      const res = await api.check(draft, worked.span, worked.correction, intent);
      // Stay on target: fixing the worked error succeeds even if the rewrite broke
      // something else. The collateral is recast like anything else.
      if (res.fixed) return resolve(turn.text, res.corrected, res.recasts);
      if (n === 1) {
        setTurn({ ...turn, attempt: 2, checking: false, missed: true });
      } else {
        resolve(turn.text, analysis.corrected, analysis.recasts);
      }
    } catch (e) {
      fail(e);
    }
  };

  const resolve = async (original: string, corrected: string, recasts: Recast[]) => {
    const next: Message[] = [...messages, { role: "learner", original, corrected, recasts }];
    setMessages(next);
    setTurn({ phase: "replying" });
    try {
      const { reply } = await api.reply(corrected, transcript(messages));
      setMessages([...next, { role: "partner", text: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setTurn({ phase: "idle" });
  };

  const onWord = async (w: string, sentence: string) => {
    if (!w) return;
    setWord({ word: w, examples: null });
    try {
      const { examples } = await api.lookUpWord(w, sentence);
      setWord({ word: w, examples });
    } catch (e) {
      setWord(null);
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const onReword = async (index: number) => {
    const m = messages[index];
    if (m.role !== "partner") return;
    setRewordingAt(index);
    try {
      const { simpler } = await api.reword(m.text, transcript(messages.slice(0, index)));
      setMessages((ms) =>
        ms.map((x, i) => (i === index && x.role === "partner" ? { ...x, reworded: simpler } : x)),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setRewordingAt(null);
  };

  const busy = turn.phase !== "idle";
  const status =
    turn.phase === "filling"
      ? "llenando…"
      : turn.phase === "reading"
        ? "leyendo…"
        : turn.phase === "analyzing"
          ? "revisando…"
          : turn.phase === "replying"
            ? "…"
            : null;

  return (
    <div className="app" data-panel={turn.phase === "correcting" || turn.phase === "intent"}>
      <main className="thread">
        <header>
          <h1>pocoapoco</h1>
          <span className="sub">prototype</span>
        </header>

        {messages.map((m, i) =>
          m.role === "partner" ? (
            <PartnerMessage
              key={i}
              message={m}
              onWord={onWord}
              onReword={() => onReword(i)}
              rewording={rewordingAt === i}
            />
          ) : (
            <div className="msg learner" key={i}>
              {m.original !== m.corrected && <p className="bubble original">{m.original}</p>}
              <p className="bubble">{m.corrected}</p>
              <Recasts recasts={m.recasts} />
            </div>
          ),
        )}

        {status && <p className="status">{status}</p>}
        {error && <p className="error">{error}</p>}
        <div ref={endRef} />

        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Escribe en español. Usa [brackets] para palabras que no sabes."
            disabled={busy}
            rows={2}
          />
          <button type="submit" disabled={busy || !input.trim()}>
            Enviar
          </button>
        </form>
      </main>

      {turn.phase === "intent" && (
        <aside className="panel">
          <h2>Is this what you meant?</h2>
          {turn.readable ? (
            <p className="reading">{turn.english}</p>
          ) : (
            <p className="reading unreadable">I can't read this. What were you trying to say?</p>
          )}
          {turn.readable && (
            <button className="primary" onClick={() => confirmIntent(turn.english)}>
              Yes, that's it
            </button>
          )}
          <textarea
            value={meant}
            onChange={(e) => setMeant(e.target.value)}
            placeholder={turn.readable ? "No — I meant…" : "In English, what you meant…"}
            rows={3}
          />
          <button
            className={turn.readable ? "" : "primary"}
            disabled={!meant.trim()}
            onClick={() => confirmIntent(meant.trim())}
          >
            That's what I meant
          </button>
          <p className="note">
            Your English is never answered and never handed back to translate. It only aims the
            correction.
          </p>
        </aside>
      )}

      {turn.phase === "correcting" && turn.analysis.worked && (
        <aside className="panel">
          <h2>One thing</h2>
          <p className="marked">
            <Marked text={turn.text} span={turn.analysis.worked.span} />
          </p>
          {turn.missed && <p className="note miss">Not yet. One more.</p>}
          <textarea
            value={turn.draft}
            onChange={(e) => setTurn({ ...turn, draft: e.target.value })}
            rows={4}
            disabled={turn.checking}
          />
          <button
            className="primary"
            onClick={attempt}
            disabled={turn.checking || !turn.draft.trim()}
          >
            {turn.checking ? "…" : turn.attempt === 1 ? "Try" : "Last try"}
          </button>
          <p className="note">Attempt {turn.attempt} of 2.</p>
        </aside>
      )}

      {word && (
        <div className="sheet" onClick={() => setWord(null)}>
          <div className="sheet-inner" onClick={(e) => e.stopPropagation()}>
            <h3>{word.word}</h3>
            {word.examples ? (
              <ul>
                {word.examples.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="status">…</p>
            )}
            <button onClick={() => setWord(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
