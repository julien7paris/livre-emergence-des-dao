// src/BookLanding.tsx

const AMAZON_URL = "https://www.amazon.fr/dp/ASIN_A_REMPLACER"
// place l'image dans public/photo-couverture.jpg (nom sans espace)
const COVER_URL = "/photo-couverture.jpg"

const toc = [
  {
    part: "Partie 1 : Comprendre les DAO",
    chapters: [
      "Chapitre 1. Aux origines : de Bitcoin à Ethereum",
      "Chapitre 2. Qu’est-ce qu’une DAO ?",
      "Chapitre 3. Smart contracts",
      "Chapitre 4. Mythes & idées fausses",
    ],
  },
  {
    part: "Partie 2 : Pourquoi les DAO sont l’avenir",
    chapters: [
      "Chapitre 5. Entreprises natives d’Internet",
      "Chapitre 6. Cas d’usage (finance, culture, gaming…)",
      "Chapitre 7. Pouvoir, valeur, confiance",
    ],
  },
  {
    part: "Partie 3 : Construire une DAO",
    chapters: [
      "Chapitre 8. Problème → solution DAO",
      "Chapitre 9. Gouvernance",
      "Chapitre 10. Tokenomics",
      "Chapitre 11. Outils pratiques",
      "Chapitre 12. Confiance & engagement",
      "Chapitre 13. Innovation & coordination",
    ],
  },
  {
    part: "Partie 4 : Les pièges et comment les éviter",
    chapters: [
      "Chapitre 14. DAO zombies",
      "Chapitre 15. Guerres de gouvernance",
      "Chapitre 16. Juridique & conformité",
    ],
  },
  {
    part: "Partie 5 : Devenir acteur",
    chapters: ["Chapitre 17. Rejoindre", "Chapitre 18. Lancer", "Chapitre 19. S’entourer"],
  },
]

const reviews = [
  { name: "Camille R.", role: "Fondatrice Web3", text: "Enfin un guide clair, concret et actionnable." },
  { name: "Yanis B.", role: "Dev smart contracts", text: "La meilleure intro française aux DAO que j’ai lue." },
  { name: "Aïcha M.", role: "Product Manager", text: "Des structures, des exemples et zéro bla-bla." },
]

// Liens visibles (SEO)
const seoLinks = [
  { label: "Blockchain", href: "#glossaire-blockchain" },
  { label: "Smart contracts", href: "#glossaire-smart-contracts" },
  { label: "MetaMask", href: "https://metamask.io/" },
  { label: "Wallet", href: "#glossaire-wallet" },
  { label: "Snapshot (vote)", href: "https://snapshot.org/" },
  { label: "Aragon (gouvernance)", href: "https://aragon.org/" },
]

// Exemples de DAO
const daoExamples = [
  { name: "MakerDAO", url: "https://makerdao.com/" },
  { name: "Uniswap DAO", url: "https://uniswap.org/" },
  { name: "ENS DAO", url: "https://ens.domains/" },
  { name: "Gitcoin", url: "https://www.gitcoin.co/" },
  { name: "Aave DAO", url: "https://aave.com/" },
  { name: "ConstitutionDAO", url: "https://www.constitutiondao.com/" },
]

export default function BookLanding() {
  // Données structurées (SEO)
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "L’Émergence des DAO",
    author: { "@type": "Person", name: "Julien Lallemand" },
    image: COVER_URL,
    inLanguage: "fr",
    genre: ["Technologie", "Économie", "Web3"],
    description:
      "Comprendre, créer et gouverner une DAO : guide pratique (gouvernance on-chain, tokenomics, sécurité, juridique, outils et cas d’usage).",
    url: AMAZON_URL,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Le livre convient-il aux non-techniciens ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Oui. Le vocabulaire est expliqué et chaque chapitre se termine par des exemples et des checklists.",
        },
      },
      {
        "@type": "Question",
        name: "Version papier ou PDF disponibles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La version Kindle est prioritaire. Papier/PDF pourront suivre selon la demande.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-semibold">L’Émergence des DAO</div>
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-black text-white"
          >
            Acheter
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            L’<span className="whitespace-nowrap">ÉMERGENCE</span> DES DAO
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Le guide clair et actionnable pour <b>comprendre</b>, <b>créer</b> et <b>gouverner</b> une DAO :
            gouvernance, tokenomics, sécurité, juridique, outils — avec cas d’usage et checklists.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-black text-white"
            >
              Acheter maintenant
            </a>
            <a href="#toc" className="px-5 py-3 rounded-xl border">
              Table des matières
            </a>
          </div>
        </div>

        <div className="text-center">
          <img
            src={COVER_URL}
            alt="Couverture L’Émergence des DAO — blockchain, smart contracts, DAO, Web3"
            className="w-auto max-w-[260px] md:max-w-[320px] lg:max-w-[360px] rounded-2xl shadow-2xl ring-1 ring-slate-200 inline-block"
          />
        </div>
      </section>

      {/* SEO quick-links & exemples */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 md:mt-0">
        {/* Badges mots-clés */}
        <div className="flex flex-wrap gap-2">
          {["Blockchain", "Web3", "DAO", "Gouvernance on-chain", "Tokenomics", "Smart contracts", "MetaMask", "Wallet"].map(
            (k) => (
              <span key={k} className="text-xs px-2.5 py-1 rounded-full bg-slate-200/70">
                {k}
              </span>
            ),
          )}
        </div>

        {/* Liens utiles */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {seoLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              className="block border rounded-xl px-4 py-3 bg-white hover:bg-slate-50 transition"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Exemples de DAO */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-700">Exemples de DAO populaires</h3>
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
      </section>

      {/* TOC */}
      <section id="toc" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight">Table des matières</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {toc.map((g, i) => (
              <div key={i} className="border rounded-2xl p-5 bg-white shadow-sm">
                <div className="font-medium mb-3">{g.part}</div>
                <ul className="list-disc ml-5 space-y-2 text-sm text-slate-700">
                  {g.chapters.map((ch, j) => (
                    <li key={j}>{ch}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight">Ils en parlent</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="border rounded-2xl p-6 shadow-sm">
                <div className="text-amber-500 mb-2">★★★★★</div>
                <p className="text-sm text-slate-700">“{r.text}”</p>
                <p className="mt-3 text-sm font-medium">{r.name}</p>
                <p className="text-xs text-slate-500">{r.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossaire Web3 express */}
      <section id="glossaire" className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm text-slate-700">
          <div id="glossaire-blockchain">
            <h3 className="font-semibold text-slate-900">Blockchain</h3>
            <p className="mt-2">
              Registre distribué, immuable et public qui enregistre les transactions. Base des cryptomonnaies et des DAO.
            </p>
          </div>
          <div id="glossaire-smart-contracts">
            <h3 className="font-semibold text-slate-900">Smart contracts</h3>
            <p className="mt-2">
              Programmes sur la blockchain qui automatisent règles et votes d’une DAO sans intermédiaire.
            </p>
          </div>
          <div id="glossaire-wallet">
            <h3 className="font-semibold text-slate-900">Wallet (ex : MetaMask)</h3>
            <p className="mt-2">
              Application qui gère vos clés privées pour signer des transactions, voter et recevoir des tokens.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-6 space-y-3">
            <details className="border rounded-xl p-4">
              <summary className="cursor-pointer font-medium">Le livre convient-il aux non-techniciens ?</summary>
              <p className="mt-2 text-sm text-slate-700">
                Oui. Le vocabulaire est expliqué et chaque chapitre se termine par des exemples et des checklists.
              </p>
            </details>
            <details className="border rounded-xl p-4">
              <summary className="cursor-pointer font-medium">Version papier ou PDF disponibles ?</summary>
              <p className="mt-2 text-sm text-slate-700">
                La version Kindle est prioritaire. Papier/PDF pourront suivre selon la demande.
              </p>
            </details>
            <details className="border rounded-xl p-4">
              <summary className="cursor-pointer font-medium">Comment me tenir informé des mises à jour ?</summary>
              <p className="mt-2 text-sm text-slate-700">
                Laissez votre demande par mail juien.lallemand92@gmail.com et nous vous écrirons lors des prochaines mises à jour.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Julien Lallemand — Tous droits réservés.
      </footer>
    </div>
  )
}
