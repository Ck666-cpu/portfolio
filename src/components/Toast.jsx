import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, Trophy } from 'lucide-react';

// message: string | { title, text } for an "achievement unlocked" style toast
export default function Toast({ message }) {
  const ach = message && typeof message === 'object';
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={ach ? message.title : message}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={
              ach
                ? 'flex items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white shadow-2xl ring-1 ring-accent/50'
                : 'flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-slate-900'
            }
          >
            {ach ? (
              <>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink"><Trophy size={20} /></span>
                <span>
                  <span className="block text-xs font-semibold text-accent">Achievement unlocked</span>
                  <span className="block font-bold">{message.title}</span>
                  <span className="block text-xs text-slate-400">{message.text}</span>
                </span>
              </>
            ) : (
              <><CircleCheck size={18} className="text-accent" /> {message}</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
