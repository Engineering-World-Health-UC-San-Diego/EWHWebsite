import { faq } from '../content/site';
import { RichText } from './RichText';

/** FAQ accordion built on native <details>, so it works with keyboard and screen readers. */
export function Faq() {
  if (!faq.length) return null;
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {faq.map((item) => (
        <details key={item.question} className="group">
          <summary className="focus-visible:outline-offset-[-4px] flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg font-bold text-navy hover:text-brand sm:px-8 [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tint text-xl leading-none text-brand transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="prose-ewh px-6 pb-6 sm:px-8">
            <RichText text={item.answer} />
          </div>
        </details>
      ))}
    </div>
  );
}
