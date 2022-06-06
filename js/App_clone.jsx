const SUPABASE_URL = ''
const SUPABASE_KEY = ''

// supabaseクライアントの作成
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// データベースと通信・初回のデータ取得

const App = () => {

    // データベースから取得したデータを入れるstate
    const [todos, setTodos] = React.useState([])

    // 来訪時の名前設定で使うstate
    const [name, setName] = React.useState('')
    const [addName, setAddName] = React.useState("")

    // 読み込み中か否か
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
    const getTasks = async () => {
        try {
            setLoading(true)
            let { data: todo, error} = await _supabase.from('chats').select('*')
            if (error) {
                throw(error)
            }
            if (todo) {
                setTodos(todo);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };
    getTasks();
    }, []);

    console.log(loading)
    
    const BtnClick = (e) => {
        let gues = confirm(`この名前で合ってる？：${addName}`)
        if (gues === true) {
            setName(addName)
            setAddName("")
        } else {
            e.preventDefault()
        }
    }

    // 来訪時に名前を設定させる為の分岐
    if (name === '') {
        return (
            <div>
                <h1>名前を入力してね！</h1>
                <input type="text" placeholder="（例）近藤太郎" onChange={e => setAddName(e.target.value)} />
                <button onClick={BtnClick}>決定！</button>
            </div>
        )
    } else {
        return (
        <div>
            <h1>Hello, React CDN!</h1>
            <h2>あなたの名前は「{name}」だよ！</h2>
            {loading
            ? <p>Loading now ....</p>
            : <TodoList todos={todos} />
            }
            <InputField />
        </div>
    )
    }
}



const target = document.querySelector('#app');
ReactDOM.render(<App/>, target);