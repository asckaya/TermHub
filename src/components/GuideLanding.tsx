const GuideLanding = () => {
  return (
    <div className="py-10 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6 items-stretch">
          <h2 className="text-2xl font-bold">Guide</h2>
          <p className="opacity-70 text-sm md:text-base">
            The guide content is now on the docs page. Use the links below for documentation and
            repository resources.
          </p>

          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center justify-between p-4 rounded-md border bg-card text-card-foreground shadow-sm">
              <span className="text-sm md:text-base">Open documentation</span>
              <a className="text-cyan-500 hover:underline font-mono text-sm" href="/docs">
                /docs
              </a>
            </div>

            <div className="flex items-center justify-between p-4 rounded-md border bg-card text-card-foreground shadow-sm">
              <span className="text-sm md:text-base">Project repository</span>
              <a
                className="text-cyan-500 hover:underline font-mono text-sm"
                href="https://github.com/asckaya/TermHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideLanding
