import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { Axios } from "axios";
import Loading from "../components/loading";
import { NotificationManager } from "react-notifications";
export default function Home() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {}, [email]);
  const router = useRouter();
  //

  return (
    <div className="flex flex-row h-screen w-full">
      <div className="bg-white h-full w-full relative flex flex-col items-center justify-center lg:justify-center md:justify-center md:w-screen ">
        <img
          src="/Login/plug-icon.png"
          className="absolute top-0 left-0 h-48 2xl:h-80 xl:h-52 lg:h-48 md:h-56"
        ></img>
        <img
          src="/Login/lamp-icon.png"
          className="absolute -bottom-10 -right-5 h-44 2xl:h-80 xl:h-52 xl:bottom-0 lg:h-44 md:h-52   md:-bottom-8 lg:bottom-0"
        ></img>
        <img
          src="/Login/logo-name.png"
          className="h-20 2xl:h-40 xl:h-24 lg:h-24 md:h-24"
        ></img>
        <form
          onSubmit={async (e) => {
            try {
              setisLoading(true);
              e.preventDefault();
              // login
              const response = await axios.post(
                "https://j77ei0iqfj.execute-api.us-east-1.amazonaws.com/dev/login",
                { email: email, password: password }
              );
              console.log(response.status);
              console.log("Errow");
              // se autenticado
              // salvar token no navegador
              localStorage.setItem("raizen-token", response.data.token);
              // redirecionar

              router.push(
                "/dash/62be83cda7ff956200baec54/62c07ebb78990300401b9d83"
              );
              NotificationManager.info(
                "Bem vindo ao NEXT 2022",
                "Login realizado com sucesso!",
                4000
              );
              setisLoading(false);
              // Assim que pego o token em outras paginas
              //const token = localStorage.getItem('raizen-token')
            } catch (error) {
              setisLoading(false);
              console.log(error);
              console.log("Aqui");
              NotificationManager.error(
                "Usuário ou senha incorretos",
                "Credenciais incorretas!",
                3000
              );
            }
          }}
        >
          <label className="flex flex-col mt-10 text-sm 2xl:text-3xl xl:text-lg xl:mt-2 lg:text-base lg:mt-2 md:text-base ">
            Username/E-mail:
            <input
              onChange={(event) => setemail(event.target.value)}
              value={email}
              type={"email"}
              className="input-box"
            />
          </label>
          <label className="flex flex-col mt-2 text-sm 2xl:text-3xl xl:text-lg lg:text-base xl:mt-2 lg:mt-2 md:text-base ">
            Password:
            <input
              onChange={(event) => setpassword(event.target.value)}
              value={password}
              type={"password"}
              className="input-box"
            />
          </label>
          <div className="flex flex-row justify-center items-center">
            <button
              type="submit"
              className="py-2 px-14   bg-[#782978] hover:bg-[#BA55D3] focus:outline-none focus:ring focus:ring-violet-300 font-bold text-white rounded-md mt-14 
        2xl:py-4 2xl:px-24 2xl:text-3xl 
        xl:py-2 xl:px-18 xl:text-lg xl:mt-4 
        lg:py-2 lg:px-16 lg:text-base lg:mt-3 
        md:py-2 md:px-16 md:text-base md:mt-10
        
        "
            >
              {!isLoading ? "Login" : <Loading />}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#782978] h-full w-6/12 relative lg:flex md:hidden hidden">
        <img
          src="/Login/money-icon.png"
          className="absolute top-20 right-20 2xl:h-1/3 -mt-10 2xl:top-[28%] xl:top-56 lg:top-72 lg:left-0"
        ></img>
        <img
          src="/Login/pc-icon.png"
          className="absolute bottom-0 left-0 h-1/2 xl:h-1/3 2xl:bottom-56 xl:bottom-40  lg:h-60  lg:bottom-60 lg:left-8"
        ></img>
      </div>
    </div>
  );
}
