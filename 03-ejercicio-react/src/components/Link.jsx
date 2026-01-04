export function Link({ href, children, ...props }) {
    const handleClick = (event) => {
        event.preventDefault()
        window.history.pushState({}, '', href)
        
        // Emitir evento para que useRouter lo detecte
        const navigationEvent = new PopStateEvent('popstate')
        window.dispatchEvent(navigationEvent)
    }

    return (
        <a href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    )
}