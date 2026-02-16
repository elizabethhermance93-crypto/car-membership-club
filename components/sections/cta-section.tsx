import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "Ready to Join Zipsters?",
  description = "Speak with a representative, choose your membership plan, and start driving with transparent weekly dues.",
}: CTASectionProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-3xl bg-gradient-to-r from-[#1f3553] to-[#2a67ad] px-6 py-12 text-white sm:px-10">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/join"
              className="bg-white text-[#1f3553] hover:bg-slate-100"
            >
              Join Membership
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              className="border-white/35 bg-white/10 text-white hover:bg-white/20"
            >
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
