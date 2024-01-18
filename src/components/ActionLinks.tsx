const ActionLinks = ({showContent}: {showContent: boolean}) => {
  return (
    <div className={`absolute z-10 right-0 top-0 m-8 flex gap-4 transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 -translate-y-4'}`}>
      <a href="/downloads/Kenyon_Kowal_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-white text-blue-1 px-3 py-2 font-body font-extralight">
        Résumé
      </a>
      <a href={`mailto:hello@kenyonkowal.com`} className={`text-12 p-3 font-bold rounded-full bg-blue-3 w-10 h-10 inline-flex items-center justify-center transition-all duration-1000 transform`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="-mb-1 -ml-1"><g fill="currentColor"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178l1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494l-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363L1.591 6.602z"></path><path d="M16 12.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"></path></g></svg></a>
    </div>
  )
}

export default ActionLinks;