const GuideDocs = () => {
  return (
    <div className="py-10 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6 items-stretch max-w-3xl">
          <h2 className="text-2xl font-bold">Documentation</h2>
          <p className="opacity-70 text-sm md:text-base">
            Documentation is being migrated to shadcn/ui component patterns. In the meantime, use
            the project README and source for setup/configuration details.
          </p>
          <a
            href="https://github.com/asckaya/TermHub"
            rel="noopener noreferrer"
            target="_blank"
            className="text-cyan-500 hover:underline font-medium"
          >
            Open repository
          </a>
        </div>
      </div>
    </div>
  )
}

export default GuideDocs
