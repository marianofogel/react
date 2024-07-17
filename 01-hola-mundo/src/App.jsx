import './App.css'
import { TwitterFollowCards } from './TwitterFollowCards'

const users = [
    {
        userName: 'secayosteam',
        name: 'Se Cayo Steam?',
        isFollowing: true
    },
    {
        userName: 'BVBDortmund_Arg',
        name: 'Borussia Dortmund',
        isFollowing: false
    },
    {
        userName: 'BocaJrsOficial',
        name: 'Boca Juniors',
        isFollowing: true
    },
    {
        userName:'GonzaMazzeo',
        name: 'Gonza',
        isFollowing: true,
    }
]

export function App() {

    const formatoArroba = (userName) => `@${userName}`

    return (
        <section className='App'>

            <TwitterFollowCards formatUserName={formatoArroba}
                userName="MaatiToledo"
                isFollowing>
                Matulais
            </TwitterFollowCards>
            <TwitterFollowCards formatUserName={formatoArroba}
                userName="Atlantismo_"
                isFollowing>
                Kevin
            </TwitterFollowCards>
            <TwitterFollowCards formatUserName={formatoArroba}
                userName="xmilianx_"
                isFollowing>
                Palito
            </TwitterFollowCards>

            {
                users.map(user => {
                    const { userName, name, isFollowing } = user
                    return (
                        <TwitterFollowCards
                            formatUserName={formatoArroba}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                            key={userName} //TIENE QUE SER UNICO
                        >
                            {name}
                        </TwitterFollowCards>
                    )
                })
            }
        </section>
    )
}

