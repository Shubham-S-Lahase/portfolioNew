export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// TODO: Replace these placeholder testimonials with real client/colleague quotes.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Shubham consistently delivered high-quality frontend work and raised the bar for our component standards.",
    name: "Engineering Lead",
    role: "Engineering Lead",
    company: "Biztoso Technologies",
  },
  {
    quote:
      "Great eye for UX and an even better eye for performance. Our dashboards loaded faster after his refactor.",
    name: "Product Manager",
    role: "Product Manager",
    company: "Gajan Solutions",
  },
  {
    quote:
      "Reliable, collaborative, and quick to ship — exactly the kind of engineer you want on a fast team.",
    name: "Senior Developer",
    role: "Senior Developer",
    company: "10X Academy",
  },
];
