'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type StatBarProps = {
  percent: number;
  claim: string;
};

export default function StatBar({ percent, claim }: StatBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-lumara-warm-black" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          {claim}
        </p>
        <span
          className="text-2xl ml-4 shrink-0"
          style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700 }}
        >
          {percent}%
        </span>
      </div>
      <div className="h-px bg-lumara-border w-full overflow-hidden">
        <motion.div
          className="h-full bg-lumara-gold"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
