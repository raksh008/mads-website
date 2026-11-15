# MADS website

Waitlist landing page for MADS, "Your finance pal". It is built in Framer and published at https://raksh008.github.io/mads-website/
Framer keeps the page layout in its own editor, so this folder holds the parts that can live as code plus the design notes.

## What's here

- `IntroSequence.tsx`: the Framer code component for the story intro (food delivery and party spends, STOP shatters, mads logo draws itself, "Your finance pal."). React with framer-motion. To use it, create a code file in Framer and paste it in.

## Design notes

- Colors: black `#0A0A0A`, saffron `#FFB020`, white
- Font: Inter
- Page order: nav (logo + "Join waitlist"), intro animation, hero (heading "Know where every rupee goes.", email waitlist form), features ("Track every rupee", "Spot the leaks", "Make it last"), footer
- Waitlist form: email input and a "Join waitlist" button. The form destination still needs to be set in Framer.
