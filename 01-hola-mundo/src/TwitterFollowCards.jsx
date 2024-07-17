import { useState } from "react"

export function TwitterFollowCards ({ children, formatUserName, userName, initialIsFollowing}){
    
    const[isFollowing, setIsFollowing] = useState(initialIsFollowing) //UseState inicializa la variable isFollowing en FALSE (en este caso)
    //   ESTADO ACTUAL, ESTADO PROXIMO
    const textoDelFollow = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
    ? 'tw-followcard-button is-following'
    : 'tw-followcard-button'
    
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    } //CAMBIA EL ESTADO DEL ISFOLLOWING.
    
    return (
        <article className='tw-followcard'>
            <header className='tw-followcard-header'>
                <img src={`https://unavatar.io/${userName}`} alt="La foto de Kevin" className='tw-followcard-avatar' />
                <div className='tw-followcard-info'> 
                    <strong>{children}</strong>
                    <span className='tw-followcard-infoUserName'>{formatUserName(userName)}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followcard-text">{textoDelFollow}</span>
                    <span className="tw-followcard-stopFollow">Dejar de Seguir</span>
                </button>
            </aside>
        </article>
    )
}