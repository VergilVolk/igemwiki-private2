import { Link } from "react-router-dom";

const engagementPages = [
  {
    eyebrow: "Part 01 · Integrated human practices",
    heading: "A project rebuilt by its conversations.",
    description:
      "Discussions with our PI, advisors, and stakeholders pushed back on NucleArk's purpose and design — and the project changed in response. How the project itself was reshaped by dialogue is documented there, while the effects on day-to-day wet-lab work are documented on the Wet Lab pages, with links in both directions.",
    path: "/engagement/integrated-hp",
    action: "Read integrated human practices",
  },
  {
    eyebrow: "Part 02 · Inclusivity",
    heading: "Who gets a voice in the conversation?",
    description:
      "Synthetic biology is better when more people can question it. Our inclusivity work lowers the barriers that keep people out of that conversation — inside the team, in the classroom, and beyond.",
    path: "/engagement/inclusivity",
    action: "Read inclusivity",
  },
  {
    eyebrow: "Part 03 · Collaboration",
    heading: "Built with others, not just beside them.",
    description:
      "From exchanges with other iGEM teams to the labs and facilities around us, collaboration turned isolated problems into shared ones. This page collects the partnerships and what came out of them.",
    path: "/engagement/collaboration",
    action: "Read collaboration",
  },
];

export function EngagementSummary() {
  return (
    <>
      <section className="content-section narrow">
        <p className="eyebrow">Engagement</p>
        <h2>Science that answers to the people around it.</h2>
        <p>
          NucleArk is a nuclear delivery system, but delivery is only half the
          story. The other half happens away from the bench: talking with the
          people the project touches, widening who can take part in the
          conversation, and working with others who care about the same
          problems. This page summarizes the three strands of our engagement
          work and how each one connects back to the laboratory.
        </p>
      </section>
      {engagementPages.map((page) => (
        <section className="content-section narrow" key={page.path}>
          <p className="eyebrow">{page.eyebrow}</p>
          <h2>{page.heading}</h2>
          <p>{page.description}</p>
          <Link className="button-link" to={page.path}>
            {page.action}
          </Link>
        </section>
      ))}
    </>
  );
}
