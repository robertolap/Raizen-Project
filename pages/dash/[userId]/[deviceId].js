import React, { useEffect, useState } from "react";
import "chart.js/auto";
import dynamic from "next/dynamic";
import ChartLine from "../../../components/chartLine";
import ChartLineLegends from "../../../components/chatLineLegends";
import Modal from "../../../components/modal";
import axios from "axios";
import moment from "moment";
import Router from "next/router";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});
import { useRouter } from "next/router";
//import Chart from 'chart.js/auto'

export default function Dash({ deviceId, userId }) {
  const [modaldata, setmodaldata] = useState(null);
  const [currentbutton, setcurrentbutton] = useState("year");
  const [gastoCustoAtual, setgastoCustoAtual] = useState(0);
  const [gastoCorrenteAtual, setgastoCorrenteAtual] = useState(0);
  const [gastoPotenciaAtual, setgastoPotenciaAtual] = useState(0);
  const [gastoTensãoAtual, setgastoTensãoAtual] = useState(0);

  const [gastomensal, setgastomensal] = useState([]);
  const [custKWH, setcustKWH] = useState(0.869634);
  const [corrente, setcorrente] = useState([]);
  const [tensao, settensao] = useState([]);
  const [potencia, setpotencia] = useState([]);
  const deviceIds = {
    "62c07ebb78990300401b9d83": "Secador",
    "6349df540482b0c877a004af": "Cafeteira",
    "6349df580482b0c877a004b0": "Lâmpada",
  };
  const [current, setcurrent] = useState(deviceIds[deviceId]);

  const getData = async () => {
    const response = await axios.get(
      "https://j77ei0iqfj.execute-api.us-east-1.amazonaws.com/dev/getData",
      {
        params: {
          userId: userId,
          deviceId: deviceId,
        },
      }
    );
    const year = new Intl.DateTimeFormat("pt-br", {
      month: "long",
    });
    const day = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setcorrente(
      response.data.data.corrente.map((item) => {
        if (currentbutton == "day") {
          return {
            ...item,
            x: day.format(new Date(item.date)),
          };
        }
        if (currentbutton == "year") {
          return {
            ...item,
            x: year.format(new Date(item.date)),
          };
        }
        if (currentbutton == "month") {
          return {
            ...item,
            x: new Date(item.date).toLocaleDateString("pt-br"),
          };
        }
      })
    );
    settensao(
      response.data.data.tensao.map((item) => {
        if (currentbutton == "day") {
          return {
            ...item,
            x: day.format(new Date(item.date)),
          };
        }
        if (currentbutton == "year") {
          return {
            ...item,
            x: year.format(new Date(item.date)),
          };
        }
        if (currentbutton == "month") {
          return {
            ...item,
            x: new Date(item.date).toLocaleDateString("pt-br"),
          };
        }
      })
    );
    setpotencia(
      response.data.data.potencia.map((item) => {
        if (currentbutton == "day") {
          return {
            ...item,
            x: day.format(new Date(item.date)),
          };
        }
        if (currentbutton == "year") {
          return {
            ...item,
            x: year.format(new Date(item.date)),
          };
        }
        if (currentbutton == "month") {
          return {
            ...item,
            x: new Date(item.date).toLocaleDateString("pt-br"),
          };
        }
      })
    );
    setgastoCorrenteAtual(response.data.data.correnteAtual);
    setgastoPotenciaAtual(response.data.data.potenciaAtual);
    setgastoTensãoAtual(response.data.data.tensaoAtual);

    let começoDeHoje = moment().startOf("month");
    if (response.data.data.potencia.length >= 1) {
      começoDeHoje = moment(response.data.data.potencia[0].date);
    }
    const now = moment();
    const differenceInHr = now.diff(começoDeHoje, "hour", true);
    console.log(differenceInHr);
    const custKWH = 0.869634;
    setgastoCustoAtual(
      (response.data.data.potenciaAtual * differenceInHr * custKWH) / 1000
    );
  };

  //   useEffect(() => {

  //   }, []);
  useEffect(() => {
    console.log(deviceIds[deviceId]);
    setcurrent(deviceIds[deviceId]);
    getData();
  }, [deviceId]);

  return (
    <div className="flex flex-row  w-full">
      <div className="bg-white fixed min-h-[100px] h-[100px] left-0 w-screen top-0 z-20 flex flex-row justify-between">
        <img src="/Login/logo-name.png" className="h-[80%] ml-10 mt-4"></img>
        <img src="/logo.png" className="h-[90%] mr-20 mt-4"></img>
      </div>

      <div className="bg-[#782978] fixed top-0 left-0 h-screen min-w-[300px] flex flex-col">
        <div className="bg-white mt-[150px] h-32 w-64  rounded-r-2xl flex justify-between pl-2 items-center">
          <img src="/dash/next.png" className="rounded-full w-[6rem]"></img>
          <text className="text-[1.150rem] font-bold text-[#4A4DE6] pr-6 pb-6 pt-6">
            JIGGLIPUFF
          </text>
        </div>

        <button
          onClick={() => {
            Router.push(`/dash/${userId}/62c07ebb78990300401b9d83`);
          }}
          className={` ${current == "Secador" && "bg-white text-[#4A4DE6] "} 
                  mt-8 h-16 w-52 pl-2 hover:scale-105 transition-all rounded-r-2xl flex flex-row justify-between items-center text-white font-bold text-2xl `}
        >
          Secador
          <svg
            className="mr-6 h-10 w-10"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 12.2861V3.71407H11.2C12.3104 2.62317 13.8013 2.00652 15.3579 1.99432C16.9144 1.98213 18.4148 2.57535 19.5422 3.64872C20.6695 4.72208 21.3356 6.19157 21.3998 7.74686C21.4639 9.30215 20.9211 10.8215 19.886 11.9841L21.811 17.2701C21.9494 17.6411 22.0129 18.0358 21.998 18.4315C21.9831 18.8271 21.8899 19.216 21.724 19.5755C21.5581 19.935 21.3226 20.2581 21.0312 20.5262C20.7398 20.7943 20.3982 21.002 20.0261 21.1374C19.6541 21.2729 19.2589 21.3333 18.8633 21.3152C18.4678 21.2972 18.0797 21.201 17.7215 21.0322C17.3633 20.8635 17.042 20.6255 16.7763 20.332C16.5105 20.0384 16.3055 19.6952 16.173 19.3221L14.191 13.8781C13.0619 13.6463 12.0236 13.0935 11.201 12.2861H8ZM6 12.2861H4C3.46957 12.2861 2.96086 12.0754 2.58579 11.7003C2.21071 11.3252 2 10.8165 2 10.2861V5.71407C2 5.18363 2.21071 4.67492 2.58579 4.29985C2.96086 3.92478 3.46957 3.71407 4 3.71407H6V12.2861ZM14 7.00007C13.7348 7.00007 13.4804 7.10542 13.2929 7.29296C13.1054 7.4805 13 7.73485 13 8.00007C13 8.26528 13.1054 8.51964 13.2929 8.70717C13.4804 8.89471 13.7348 9.00007 14 9.00007H17C17.2652 9.00007 17.5196 8.89471 17.7071 8.70717C17.8946 8.51964 18 8.26528 18 8.00007C18 7.73485 17.8946 7.4805 17.7071 7.29296C17.5196 7.10542 17.2652 7.00007 17 7.00007H14Z"
              fill={
                current == "Secador" ? "#4A4DE6" : "rgba(252, 253, 253, 0.9)"
              }
            />
          </svg>
        </button>

        <button
          onClick={() => {
            Router.push(`/dash/${userId}/6349df540482b0c877a004af`);
          }}
          className={` ${
            current == "Cafeteira" && "bg-white text-[#4A4DE6] "
          }  pl-2 mt-8 h-16 w-52 hover:scale-105 transition-all  rounded-r-2xl flex flex-row justify-between items-center text-white font-bold text-2xl `}
        >
          Cafeteira
          <svg
            className="mr-6 h-10 w-10"
            width="512"
            height="512"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M49.66 45.6299L108.1 148.3H325.6V78.2499L49.66 45.6299ZM77.5599 166.3V185.9H334.6C382.6 185.9 416.8 215.2 437.8 250.2C456.8 281.7 466 317.9 467.7 345.8H487.8C485.7 313 472.6 269.6 450.6 234C426.5 195.1 392.8 166.3 352.6 166.3H77.5599ZM90.8499 203.9C87.6999 208.6 81.85 219 75.98 232.5C68.64 249.4 60.38 271.3 52.68 295.4C37.29 343.7 24.2 400.9 24.2 443.3C24.2 449.3 27.47 456.4 32.74 461.8C38.01 467.1 44.9399 470.4 50.7299 470.4H370.6C376.2 470.4 383.2 467.1 388.5 461.8C393.8 456.4 397.1 449.3 397.1 443.3C397.1 400.9 384 343.7 368.5 295.4C360.8 271.3 352.5 249.4 345.1 232.5C339.2 219 333.3 208.6 330.1 203.9H90.8499ZM65.01 337.1H355.6C363.1 366.2 368.4 396.8 368.4 421.4C368.4 435.2 353.8 449.7 339.2 449.7H81.04C66.75 449.7 52.31 435.2 52.31 421.4C52.31 396.8 57.55 366.2 65.01 337.1Z"
              fill={current == "Cafeteira" ? "#4A4DE6" : "white"}
            />
          </svg>
        </button>

        <button
          onClick={() => {
            Router.push(`/dash/${userId}/6349df580482b0c877a004b0`);
          }}
          className={` ${
            current == "Lâmpada" && "bg-white text-[#4A4DE6]"
          } pl-2 mt-8 h-16 w-52 hover:scale-105 transition-all  rounded-r-2xl flex flex-row justify-between items-center text-white font-bold text-2xl `}
        >
          Lâmpada
          <svg
            className="mr-6 h-10 w-10"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 22H9V20H15V22ZM15 19H9L8.777 17C8.65702 16.3385 8.45862 15.6936 8.186 15.079C7.832 14.579 7.463 14.152 7.106 13.735C6.45663 13.1263 5.93574 12.3938 5.57404 11.5805C5.21234 10.7673 5.01715 9.88987 5 9C5 7.14348 5.7375 5.36301 7.05025 4.05025C8.36301 2.7375 10.1435 2 12 2C13.8565 2 15.637 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14348 19 9C18.9799 9.88462 18.7845 10.7565 18.4252 11.5651C18.066 12.3737 17.55 13.1031 16.907 13.711L16.89 13.731C16.5114 14.1614 16.154 14.6099 15.819 15.075C15.5466 15.6912 15.3476 16.3373 15.226 17L15 19ZM12 4C10.6744 4.00159 9.40356 4.52888 8.46622 5.46622C7.52888 6.40356 7.00159 7.6744 7 9C7 10.544 7.644 11.293 8.618 12.428C8.988 12.86 9.408 13.348 9.818 13.919C10.3156 14.8858 10.6555 15.9259 10.825 17H13.176C13.3498 15.929 13.6892 14.8916 14.182 13.925C14.582 13.354 15.001 12.863 15.37 12.431L15.385 12.413C16.357 11.273 17 10.52 17 9C16.9984 7.6744 16.4711 6.40356 15.5338 5.46622C14.5964 4.52888 13.3256 4.00159 12 4V4Z"
              fill={current == "Lâmpada" ? "#4A4DE6" : "white"}
            />
          </svg>
        </button>

        {/* <button
          className={` ${
            current == "Cozinha" && "bg-white text-[#4A4DE6]"
          }  pl-2 mt-8 h-16 w-52 hover:scale-105 transition-all  rounded-r-2xl flex flex-row justify-between items-center text-white font-bold text-2xl `}
          onClick={() => {
            setcurrent("Cozinha");
          }}
        >
          Aparelhos
          <svg
            className="mr-6 h-10 w-10"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.962 43.874C17.1419 44.069 17.2376 44.3272 17.2282 44.5923C17.2188 44.8574 17.1052 45.1082 16.912 45.29L14.74 47.321C14.5461 47.5012 14.2885 47.597 14.024 47.5875C13.7594 47.5779 13.5095 47.4637 13.329 47.27L0.680025 33.638C0.500274 33.4429 0.4048 33.1847 0.41435 32.9195C0.423899 32.6544 0.537701 32.4037 0.731025 32.222L2.90602 30.194C3.002 30.1047 3.11464 30.0351 3.2375 29.9893C3.36037 29.9435 3.49106 29.9224 3.62209 29.9271C3.75313 29.9319 3.88195 29.9624 4.00119 30.0169C4.12043 30.0715 4.22775 30.149 4.31702 30.245L16.962 43.874ZM33.102 18.224C33.2818 18.4192 33.3772 18.6774 33.3677 18.9425C33.3581 19.2076 33.2443 19.4583 33.051 19.64L19.381 32.41C19.1871 32.5902 18.9295 32.686 18.665 32.6765C18.4004 32.6669 18.1505 32.5527 17.97 32.359L14.707 28.838C14.5273 28.6429 14.4318 28.3847 14.4413 28.1195C14.4509 27.8544 14.5647 27.6037 14.758 27.422L28.425 14.652C28.5209 14.5627 28.6335 14.4932 28.7563 14.4474C28.879 14.4016 29.0096 14.3805 29.1406 14.3852C29.2716 14.39 29.4003 14.4205 29.5194 14.475C29.6386 14.5295 29.7458 14.607 29.835 14.703L33.102 18.224V18.224ZM21.613 39.527C21.987 39.93 21.964 40.567 21.562 40.943L19.387 42.973C19.2911 43.0624 19.1784 43.1319 19.0555 43.1777C18.9327 43.2235 18.802 43.2446 18.671 43.2399C18.5399 43.2352 18.4111 43.2047 18.2919 43.1501C18.1726 43.0956 18.0653 43.0181 17.976 42.922L5.33402 29.29C5.15415 29.095 5.0585 28.8369 5.06786 28.5717C5.07722 28.3066 5.19084 28.0559 5.38402 27.874L7.55503 25.845C7.74897 25.6648 8.00651 25.569 8.27108 25.5785C8.53564 25.5881 8.78559 25.7023 8.96602 25.896L21.613 39.527ZM42.676 18.713C42.8556 18.9083 42.9509 19.1666 42.9412 19.4317C42.9315 19.6969 42.8175 19.9474 42.624 20.129L40.45 22.159C40.256 22.3394 39.9984 22.4354 39.7337 22.4261C39.469 22.4167 39.2188 22.3027 39.038 22.109L26.394 8.48002C26.2139 8.28512 26.1181 8.02694 26.1275 7.76172C26.1368 7.4965 26.2506 7.24572 26.444 7.06402L28.624 5.02902C28.7199 4.9397 28.8325 4.87017 28.9553 4.82439C29.078 4.77861 29.2086 4.75748 29.3396 4.76222C29.4706 4.76695 29.5993 4.79746 29.7184 4.85199C29.8376 4.90652 29.9448 4.98401 30.034 5.08002L42.676 18.713ZM47.32 14.373C47.4996 14.5684 47.5949 14.8268 47.5854 15.092C47.5758 15.3572 47.4622 15.608 47.269 15.79L45.099 17.819C45.0032 17.9084 44.8907 17.978 44.7679 18.0239C44.6452 18.0697 44.5146 18.0909 44.3837 18.0863C44.2527 18.0817 44.1239 18.0512 44.0048 17.9968C43.8856 17.9424 43.7783 17.865 43.689 17.769L31.047 4.13402C30.8673 3.93871 30.7718 3.68048 30.7812 3.41525C30.7905 3.15003 30.904 2.89917 31.097 2.71702L33.269 0.684017C33.3647 0.594548 33.4771 0.524851 33.5998 0.478926C33.7225 0.433001 33.853 0.411752 33.9839 0.416397C34.1148 0.421043 34.2435 0.451492 34.3626 0.505997C34.4817 0.560502 34.5889 0.637991 34.678 0.734017L47.32 14.373V14.373Z"
              fill={current == "Cozinha" ? "#4A4DE6" : "white"}
            />
          </svg>
        </button> */}
        {/* <button
          className={` pl-2 mt-8 h-16 w-52 hover:scale-105 transition-all  rounded-r-2xl flex flex-row justify-between items-center text-white font-bold text-2xl `}
        >
          Adicionar
          <svg
            className="mr-6"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6842 2.68421C19.6842 1.97231 19.4014 1.28957 18.898 0.786187C18.3946 0.2828 17.7119 0 17 0C16.2881 0 15.6054 0.2828 15.102 0.786187C14.5986 1.28957 14.3158 1.97231 14.3158 2.68421V14.3158H2.68421C1.97231 14.3158 1.28957 14.5986 0.786187 15.102C0.2828 15.6054 0 16.2881 0 17C0 17.7119 0.2828 18.3946 0.786187 18.898C1.28957 19.4014 1.97231 19.6842 2.68421 19.6842H14.3158V31.3158C14.3158 32.0277 14.5986 32.7104 15.102 33.2138C15.6054 33.7172 16.2881 34 17 34C17.7119 34 18.3946 33.7172 18.898 33.2138C19.4014 32.7104 19.6842 32.0277 19.6842 31.3158V19.6842H31.3158C32.0277 19.6842 32.7104 19.4014 33.2138 18.898C33.7172 18.3946 34 17.7119 34 17C34 16.2881 33.7172 15.6054 33.2138 15.102C32.7104 14.5986 32.0277 14.3158 31.3158 14.3158H19.6842V2.68421Z"
              fill="white"
            />
          </svg>
        </button> */}
      </div>

      <div className="bg-[#E5E5E5] flex-wrap3 h-full w-full pt-[130px] lg:pl-[300px] pl-[310px] pr-[10px] lg:pr-0">
        <div className="flex flex-row items-center justify-evenly mb-8  ">
          <div className="flex flex-col items-start  justify-start  w-[500px] ">
            <h3 className="font-bold text-2xl "> NEXT 2022</h3>
          </div>

          <div className="w-[1000px] justify-start items-end flex flex-col ">
            {/* <label for="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>

              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] pl-10 p-2.5"
                placeholder="Pesquisar"
              />
            </div> */}
          </div>
        </div>

        {modaldata && (
          <Modal
            varmodaldata={modaldata}
            varsetmodaldata={setmodaldata}
          ></Modal>
        )}

        <ChartLine
          leftSrc={"/dash/dinheiro.png"}
          data={{
            datasets: [
              {
                id: 1,
                label: "Média de Custo em Reais",
                data: gastomensal,
                fill: true,
                backgroundColor: "rgba(74, 77, 230,0.2)",
                borderColor: "#4A4DE6",
              },
            ],
          }}
          potencia={potencia}
          currentbutton={currentbutton}
          setcurrentbutton={setcurrentbutton}
          custKWH={custKWH}
          settensao={settensao}
          setcorrente={setcorrente}
          setgastoTensãoAtual={setgastoTensãoAtual}
          setgastoCustoAtual={setgastoCustoAtual}
          setgastoPotenciaAtual={setgastoPotenciaAtual}
          setgastoCorrenteAtual={setgastoCorrenteAtual}
          setpotencia={setpotencia}
          leftTitle={"Custo"}
          leftSubtitle={"Total Mês"}
          leftValue={gastoCustoAtual}
          rightTitle={"Resumo de Gastos"}
          currentleftValueText={`R$${gastoCustoAtual
            .toFixed(2)
            .replace(".", ",")}`}
          setmodaldata={setmodaldata}
          gastoCustoAtual={gastoCustoAtual}
          setgastomensal={setgastomensal}
          modalcontent={{
            title: "O que é o meu Custo?",
            text: "Como que a conta de luz da sua casa é calculada? Para fazer esse cálculo a empresa de luz está sempre medindo seu uso de energia, porém esse medidor é parecido a quilometragem de um carro, não te diz o quanto gastou no dia ou mês, para isso comparam o número do medidor que estava no mês passado com o do mês atual, após isso esse número é multiplicado pelo valor de quilowatt/hora (KWh) do estado.",
          }}
        />

        {/* <ChartLine
          leftSrc={"/dash/leaf.png"}
          data={{
            datasets: [
              {
                id: 1,
                label: "Carbono Consumido",
                data: [
                  { x: "Janeiro", y: 5 },
                  { x: "Fevereiro", y: 5 },
                  { x: "Março", y: 7 },
                  { x: "Abril", y: 2 },
                  { x: "Maio", y: 3 },
                  { x: "Junho", y: 6 },
                  { x: "Julho", y: 8 },
                  { x: "Agosto", y: 6 },
                  { x: "Setembro", y: 20 },
                  { x: "Outubro", y: 5 },
                  { x: "Novembro", y: 7 },
                  { x: "Dezembro", y: 3 },
                ],
                fill: true,
                backgroundColor: "rgba(74, 77, 230,0.2)",
                borderColor: "#4A4DE6",
              },
            ],
          }}
          leftTitle={"Carbono"}
          leftSubtitle={"Média mensal"}
          leftValue={45}
          rightTitle={"Resumo de Carbono"}
          currentleftValueText="45,00Kg"
          setmodaldata={setmodaldata}
          modalcontent={{
            text: "Pegada de Carbono é o termo usado para o total de emissão de gases estufa a atmosfera. E o que isso tem a ver com a energia da sua casa? Bem quando energia elétrica é gerada de alguma forma ou outra gases estufa são emitidos no caso do Brasil as hidroelétricas emitem esses gases devido ao desmatamento necessário para a construção da usina. Por isso pode ser calculado a pegada de carbono que foi feita para a energia usada em sua casa.",
            title: "O que é Carbono Consumido?",
          }}
        /> */}
        <ChartLineLegends
          leftSrc={"/dash/tomada.svg"}
          data={{
            datasets: [
              {
                id: 1,
                label: "Média de Watts Consumidos",
                data: potencia,
                fill: true,
                backgroundColor: "rgba(74, 77, 230,0.2)",
                borderColor: "#4A4DE6",
              },
            ],
          }}
          leftTitle={"Potência"}
          currentbutton={currentbutton}
          setcurrentbutton={setcurrentbutton}
          leftSubtitle={"Média mensal"}
          leftValue={gastoPotenciaAtual}
          rightTitle={"Resumo da Potência"}
          currentleftValueText={`${(gastoPotenciaAtual / 1000)
            .toFixed(2)
            .replace(".", ",")} Kw`}
          setmodaldata={setmodaldata}
          setpotencia={setpotencia}
          modalcontent={{
            text: "Potência elétrica é a quantidade de energia consumida por um circuito elétrico, como sua geladeira, uma lâmpada ou um computador. O cálculo da potência pode ser feito de várias formas e uma delas é multiplicar a corrente pela tensão, ou seja, P = Volt x Amper. A unidade de medida da potência é o Watt(W) e usando a potência por um período de tempo que temos o Watt por hora, em sua conta de luz você deve ter visto o KWh que é quilowatt por hora, sendo que o pré-fixo quilo significa 1000 então seria 1000 watts por hora. ",
            title: "O que é Potência?",
          }}
        />

        <ChartLineLegends
          leftSrc={"/dash/tensao.svg"}
          currentbutton={currentbutton}
          setcurrentbutton={setcurrentbutton}
          data={{
            datasets: [
              {
                id: 1,
                label: "Média de Volts Consumidos",
                data: tensao,
                fill: true,
                backgroundColor: "rgba(74, 77, 230,0.2)",
                borderColor: "#4A4DE6",
              },
            ],
          }}
          leftTitle={"Tensão"}
          leftSubtitle={"Média mensal"}
          leftValue={gastoTensãoAtual}
          rightTitle={"Resumo da Tensão"}
          currentleftValueText={`${gastoTensãoAtual
            .toFixed(2)
            .replace(".", ",")} Volts`}
          setmodaldata={setmodaldata}
          settensao={settensao}
          modalcontent={{
            text: "Sem a tensão elétrica não é possível de ter uma corrente e ela existe quando tem uma diferença no potencial elétrico entre dois pontos. Mas o que é esse potencial? Podemos comparar esse caso com a gravidade. Imagine um carro em uma rua reta, mesmo sem brecar o carro irá continuar parado, mas em uma rampa ou uma ladeira em que existe uma diferença na altura entre as rodas o carro irá descer por causa da gravidade. No caso de eletricidade essa diferença é a diferença das cargas elétricas. A unidade de medida da tensão é o Volt(V) e não seja enganado, muitas pessoas dizem que o que é perigoso é a corrente elétrica, mas é importante lembrar se tem tensão tem corrente, então tome cuidado perto de fios expostos.",
            title: "O que é Tensão?",
          }}
        />
        <ChartLineLegends
          leftSrc={"/dash/raio.svg"}
          currentbutton={currentbutton}
          setcurrentbutton={setcurrentbutton}
          data={{
            datasets: [
              {
                id: 1,
                label: "Média de Amperes Consumidos",
                data: corrente,
                fill: true,
                backgroundColor: "rgba(74, 77, 230,0.2)",
                borderColor: "#4A4DE6",
              },
            ],
          }}
          leftTitle={"Corrente"}
          leftSubtitle={"Média mensal"}
          leftValue={gastoCorrenteAtual}
          rightTitle={"Resumo de Corrente"}
          currentleftValueText={`${gastoCorrenteAtual
            .toFixed(2)
            .replace(".", ",")} Amp`}
          setmodaldata={setmodaldata}
          setcorrente={setcorrente}
          modalcontent={{
            text: "Uma piscina tem água e um rio tem uma corrente de água. Da mesma forma em que um bloco de metal ou qualquer outro objeto tem elétrons em sua superfície, mas um circuito elétrico tem uma corrente de elétrons. Então o que caracteriza uma corrente? Tanto quanto a água do rio e os elétrons de um circuito, estão sem movendo de uma forma ordenada e para que uma corrente elétrica possa existir é necessário que tenha uma tensão elétrica. A unidade de medida da corrente elétrica é o Amper(A) e tenha muito cuidado pois somente 0,1A passando pelo seu coração pode matar.  ",
            title: "O que é Corrente?",
          }}
        />
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  return {
    props: {
      deviceId: params.deviceId,
      userId: params.userId,
    },
  };
}
