// src/BookLanding.tsx
import { useEffect, useRef, useState } from "react"
import type { HTMLAttributes, ReactElement } from "react"

const AMAZON_URL = "https://www.amazon.fr/dp/ASIN_A_REMPLACER"
const COVER_URL = "/photo-couverture.jpg"

/* ----------------------- Données ----------------------- */
const toc = [
  { part: "Partie 1 : Comprendre les DAO", chapters: [
    "Chapitre 1. Aux origines : de Bitcoin à Ethereum",
    "Chapitre 2. Qu’est-ce qu’une DAO ?",
    "Chapitre 3. Smart contracts",
    "Chapitre 4. Mythes & idées fausses",
  ]},
  { part: "Partie 2 : Pourquoi les DAO sont l’avenir", chapters: [
    "Chapitre 5. Entreprises natives d’Internet",
    "Chapitre 6. Cas d’usage (finance, culture, gaming…)",
    "Chapitre 7. Pouvoir, valeur, confiance",
  ]},
  { part: "Partie 3 : Construire une DAO", chapters: [
    "Chapitre 8. Problème → solution DAO",
    "Chapitre 9. Gouvernance",
    "Chapitre 10. Tokenomics",
    "Chapitre 11. Outils pratiques",
    "Chapitre 12. Confiance & engagement",
    "Chapitre 13. Innovation & coordination",
  ]},
  { part: "Partie 4 : Les pièges et comment les éviter", chapters: [
    "Chapitre 14. DAO zombies",
    "Chapitre 15. Guerres de gouvernance",
    "Chapitre 16. Juridique & conformité",
  ]},
  { part: "Partie 5 : Devenir acteur", chapters: ["Chapitre 17. Rejoindre", "Chapitre 18. Lancer", "Chapitre 19. S’entourer"] },
]

const reviews = [
  { name: "Camille R.", role: "Fondatrice Web3", text: "Enfin un guide clair, concret et actionnable." },
  { name: "Yanis B.", role: "Dev smart contracts", text: "La meilleure intro française aux DAO que j’ai lue." },
  { name: "Aïcha M.", role: "Product Manager", text: "Des structures, des exemples et zéro bla-bla." },
]

const seoLinks = [
  { label: "Blockchain", href: "#glossaire-blockchain" },
  { label: "Smart contracts", href: "#glossaire-smart-contracts" },
  { label: "MetaMask", href: "https://metamask.io/" },
  { label: "Wallet", href: "#glossaire-wallet" },
  { label: "Snapshot (vote)", href: "https://snapshot.org/" },
  { label: "Aragon (gouvernance)", href: "https://aragon.org/" },
]

const daoExamples = [
  { name: "MakerDAO", url: "https://makerdao.com/" },
  { name: "Uniswap DAO", url: "https://uniswap.org/" },
  { name: "ENS DAO", url: "https://ens.domains/" },
  { name: "Gitcoin", url: "https://www.gitcoin.co/" },
  { name: "Aave DAO", url: "https://aave.com/" },
  { name: "ConstitutionDAO", url: "https://www.constitutiondao.com/" },
]

/* ----------------------- Hooks UI ----------------------- */
// Reveal au scroll
function useReveal() {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add("reveal")
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// Composant Reveal typé (sans JSX namespace)
type AnyTag = keyof HTMLElementTagNameMap
type RevealProps = HTMLAttributes<HTMLElement> & { as?: AnyTag }

function Reveal({ as = "section", className = "", ...rest }: RevealProps): ReactElement {
  const Component = as as any
  const ref = useReveal()
  return <Component ref={ref as any} className={className} {...rest} />
}

// Parallaxe/tilt (désactivé sur écrans tactiles)
function useTilt(max = 10) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(pointer: coarse)").matches) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      const rx = (y - 0.5) * -2 * max
      const ry = (x - 0.5) * 2 * max
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
    }
    const onLeave = () => { el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)" }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [max])
  return ref
}

// Mode sombre (toggle + persistance)
function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
  })
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add("dark"); else root.classList.remove("dark")
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])
  return { dark, toggle: () => setDark(d => !d) }
}

/* ----------------------- Page ----------------------- */
export default function BookLanding() {
  const { dark, toggle } = useTheme()
  const tiltRef = useTilt(9)

  // JSON-LD
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "L’Émergence des DAO",
    author: { "@type": "Person", name: "Julien Lallemand" },
    image: COVER_URL,
    inLanguage: "fr",
    genre: ["Technologie", "Économie", "Web3"],
    description:
      "Comprendre, créer et gouverner une DAO : guide pratique (gouvernance on-chain, tokenomics, sécurité, juridique, outils, cas d’usage).",
    url: AMAZON_URL,
  }
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Le livre convient-il aux non-techniciens ?",
        acceptedAnswer: { "@type": "Answer", text: "Oui. Vocabulaire expliqué + checklists par chapitre." } },
      { "@type": "Question", name: "Version papier ou PDF disponibles ?",
        acceptedAnswer: { "@type": "Answer", text: "La version Kindle est prioritaire. Papier/PDF possibles selon la demande." } }
    ]
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-slate-900 dark:text-slate-100"
         style={{ backgroundImage: "var(--grad-2)" }}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header */}
      <header className="sticky top-0 z-40 glass dark:bg-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-semibold gradient-text">L’Émergence des DAO</div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="rounded-lg border px-2.5 py-1.5 text-sm bg-white/70 dark:bg-white/10">
              {dark ? "☀️ Clair" : "🌙 Sombre"}
            </button>
            <a href={AMAZON_URL} target="_blank" rel="noreferrer" className="btn-grad px-4 py-2 rounded-xl">Acheter</a>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 opacity-60" />
      </header>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center blobs">
        <Reveal as="div" className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="gradient-text">L’ÉMERGENCE</span> DES DAO
          </h1>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            Le guide clair et actionnable pour <b>comprendre</b>, <b>créer</b> et <b>gouverner</b> une DAO :
            gouvernance, tokenomics, sécurité, juridique, outils — avec cas d’usage et checklists.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={AMAZON_URL} target="_blank" rel="noreferrer" className="btn-grad px-5 py-3 rounded-xl">
              Acheter maintenant
            </a>
            <a href="#toc" className="px-5 py-3 rounded-xl border bg-white hover:bg-slate-50 transition dark:bg-white/10 dark:hover:bg-white/20">
              Table des matières
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Blockchain","Web3","DAO","Gouvernance on-chain","Tokenomics","Smart contracts","MetaMask","Wallet"]
              .map(k => <span key={k} className="text-xs px-2.5 py-1 rounded-full bg-white/70 border dark:bg-white/10">{k}</span>)}
          </div>
        </Reveal>

        <Reveal as="div" className="relative z-10 text-center">
          <div ref={tiltRef} className="inline-block transition-transform duration-300 will-change-transform">
            <img
              src={COVER_URL}
              alt="Couverture L’Émergence des DAO — blockchain, smart contracts, DAO, Web3"
              className="w-auto max-w-[260px] md:max-w-[320px] lg:max-w-[360px] rounded-2xl ring-glow"
            />
          </div>
        </Reveal>
      </section>

      {/* Liens utiles & exemples */}
      <Reveal className="max-w-6xl mx-auto px-4 -mt-6 md:mt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {seoLinks.map((l) => (
            <a key={l.label} href={l.href}
               target={l.href.startsWith("http") ? "_blank" : undefined}
               rel={l.href.startsWith("http") ? "noreferrer" : undefined}
               className="block glass dark:bg-white/10 rounded-xl px-4 py-3 hover:bg-white transition dark:hover:bg-white/20">
              {l.label}
            </a>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Exemples de DAO populaires</h3>
          <ul className="mt-2 flex flex-wrap gap-3 text-sm">
            {daoExamples.map((d) => (
              <li key={d.name}>
                <a className="underline decoration-dotted hover:decoration-solid" href={d.url} target="_blank" rel="noreferrer">
                  {d.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* TOC */}
      <Reveal id="toc" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight gradient-text">Table des matières</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {toc.map((g, i) => (
              <div key={i} className="glass dark:bg-white/10 rounded-2xl p-5">
                <div className="font-medium mb-3">{g.part}</div>
                <ul className="list-disc ml-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {g.chapters.map((ch, j) => <li key={j}>{ch}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Reviews */}
      <Reveal className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight gradient-text">Ils en parlent</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="glass dark:bg-white/10 rounded-2xl p-6">
                <div className="text-amber-500 mb-2">★★★★★</div>
                <p className="text-sm text-slate-800 dark:text-slate-200">“{r.text}”</p>
                <p className="mt-3 text-sm font-medium">{r.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{r.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Glossaire */}
      <Reveal id="glossaire" className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm text-slate-700 dark:text-slate-300">
          <div id="glossaire-blockchain" className="glass dark:bg-white/10 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Blockchain</h3>
            <p className="mt-2">Registre distribué, immuable et public qui enregistre les transactions. Base des cryptomonnaies et des DAO.</p>
          </div>
          <div id="glossaire-smart-contracts" className="glass dark:bg-white/10 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Smart contracts</h3>
            <p className="mt-2">Programmes sur la blockchain qui automatisent règles et votes d’une DAO sans intermédiaire.</p>
          </div>
          <div id="glossaire-wallet" className="glass dark:bg-white/10 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Wallet (ex : MetaMask)</h3>
            <p className="mt-2">Application qui gère vos clés privées pour signer des transactions, voter et recevoir des tokens.</p>
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight gradient-text">FAQ</h2>
          <div className="mt-6 space-y-3">
            <details className="glass dark:bg-white/10 rounded-xl p-4">
              <summary className="cursor-pointer font-medium">Le livre convient-il aux non-techniciens ?</summary>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Oui. Le vocabulaire est expliqué et chaque chapitre se termine par des exemples et des checklists.</p>
            </details>
            <details className="glass dark:bg-white/10 rounded-xl p-4">
              <summary className="cursor-pointer font-medium">Version papier ou PDF disponibles ?</summary>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">La version Kindle est prioritaire. Papier/PDF pourront suivre selon la demande.</p>
            </details>
            <details className="glass dark:bg-white/10 rounded-xl p-4">
              <summary className="cursor-pointer font-medium">Comment me tenir informé des mises à jour ?</summary>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Laissez votre email en bas de page et nous vous écrirons lors des prochaines mises à jour.</p>
            </details>
          </div>
        </div>
      </Reveal>

      {/* CTA mobile sticky */}
      <a href={AMAZON_URL} target="_blank" rel="noreferrer"
         className="md:hidden fixed bottom-4 right-4 btn-grad px-4 py-3 rounded-full shadow-xl" aria-label="Acheter sur Amazon">
        Acheter
      </a>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-white/10">
        © {new Date().getFullYear()} Julien Lallemand — Tous droits réservés.
      </footer>
    </div>
  )
}
