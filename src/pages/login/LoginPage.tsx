import HomePage from "../home/HomePage"

function LoginPage() {

  //TODO: переход на домашнюю страницу
  const changePage=()=>{
    // () => window.open("http://127.0.0.1:5173/")
    () => window.location.assign('http://127.0.0.1:5173/')
  }
  
  return (
    <>
      <div>Login Page</div>
      <button onClick={changePage}>Go to home page</button>   
    </> 
  )
}

export default LoginPage;
