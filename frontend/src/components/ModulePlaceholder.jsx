function ModulePlaceholder({ eyebrow, title, description }) {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
      </div>

      <div className="module-placeholder">
        <strong>{title}</strong>
        <p>Modulo predisposto. Le funzioni operative saranno aggiunte nei prossimi passaggi.</p>
      </div>
    </section>
  )
}

export default ModulePlaceholder