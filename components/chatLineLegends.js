import "chart.js/auto";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Loading from "./loading";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function ChartLineLegends({
  data,
  leftTitle,
  leftSubtitle,
  rightTitle,
  leftSrc,
  currentleftValueText,
  setmodaldata,
  modalcontent,
  settensao,
  setcorrente,
  setpotencia,
  currentbutton,
  setcurrentbutton,
}) {
  const router = useRouter();
  const { deviceId, userId } = router.query;
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex 2xl:flex-row flex-col items-center justify-evenly mt-4 mb-6 bg-white rounded-lg shadow-lg mx-10">
      <div className="flex flex-col items-center justify-center   2xl:h-[500px] 2xl:w-auto w-full mb-10 2xl:mb-0 lg-aspect-square p-8">
        <div className="flex flex-col justify-start items-center w-full">
          <div className="flex flex-col justify-start items-start mr-60">
            <span className="font-semibold">{leftTitle}</span>
            <span className=" text-slate-400 font-medium">{leftSubtitle}</span>
          </div>

          <div className=" flex flex-col ml-64 justify-evenly">
            <div className=" h-3 w-3 rounded-full bg-indigo-300  "></div>
            <div className="  items-center justify-start ml-8 -mt-4">
              <h2 className="  text-indigo-300">Baixo</h2>
            </div>

            <div className=" h-3 w-3 rounded-full bg-indigo-500 mt-2"></div>
            <div className="flex flex-row justify-start ml-8 -mt-4">
              <h2 className=" text-indigo-500 ">Medio</h2>
            </div>

            <div className=" h-3 w-3 rounded-full bg-indigo-700 mt-2"></div>
            <div className=" flex flex-row justify-start ml-8 -mt-4">
              <h2 className=" text-indigo-700 ">Alto</h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center  mr-16 ">
          <img src={leftSrc} />
          <h2 className="text-[#4A4DE6] mt-4 text-[2.5rem]">
            {currentleftValueText}
          </h2>
        </div>

        <div className="flex flex-col items-center ">
          <div className="flex flex-col -mt-12 ml-64">
            <div class="  w-14 h-10 rounded-sm  bg-indigo-100"></div>
            <div class="  w-14 h-10 rounded-sm  bg-indigo-300"></div>
            <div class="  w-14 h-16 rounded-sm  bg-indigo-500"></div>
          </div>

          <div className="flex flex-row mr-52 mt-16">
            <button
              onClick={() => {
                setmodaldata(modalcontent);
              }}
              className="bg-indigo-500 rounded-md h-8 w-24 text-bold text-white  text-center show-modal "
            >
              Saiba mais
            </button>
          </div>
        </div>
      </div>

      <div className="h-[450px] w-[1px] bg-purple-200 2xl:flex hidden" />
      <div className="2xl:h-[500px] 2xl:w-[1000px] w-full mb-10 2xl:mb-0  p-16 justify-center flex flex-col">
        <div className="flex flex-row">
          <span className="mr-40 font-semibold text-lg">{rightTitle}</span>

          <button
            className={`rounded-full ${
              currentbutton == "day" ? "bg-[#4A4DE6]" : "bg-slate-500"
            }  transition-all px-6 py-1 shadow-2xl text-white mr-4`}
            onClick={async () => {
              setcurrentbutton("day");
              setLoading(true);
              const response = await axios.get(
                "https://j77ei0iqfj.execute-api.us-east-1.amazonaws.com/dev/getData",
                {
                  params: {
                    userId: userId,
                    deviceId: deviceId,
                    dateFilter: "day",
                  },
                }
              );

              if (leftTitle == "Corrente")
                setcorrente(
                  response.data.data.corrente.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              if (leftTitle == "Tensão")
                settensao(
                  response.data.data.tensao.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              if (leftTitle == "Potência")
                setpotencia(
                  response.data.data.potencia.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              setLoading(false);
            }}
          >
            Dia
          </button>

          <button
            className={`rounded-full ${
              currentbutton == "month" ? "bg-[#4A4DE6]" : "bg-slate-500"
            }  transition-all px-6 py-1 shadow-2xl text-white mr-4`}
            onClick={async () => {
              setcurrentbutton("month");
              setLoading(true);
              const response = await axios.get(
                "https://j77ei0iqfj.execute-api.us-east-1.amazonaws.com/dev/getData",
                {
                  params: {
                    userId: userId,
                    deviceId: deviceId,
                    dateFilter: "month",
                  },
                }
              );

              if (leftTitle == "Corrente")
                setcorrente(
                  response.data.data.corrente.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              if (leftTitle == "Tensão")
                settensao(
                  response.data.data.tensao.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              if (leftTitle == "Potência")
                setpotencia(
                  response.data.data.potencia.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              setLoading(false);
            }}
          >
            Mês
          </button>

          <button
            className={`rounded-full ${
              currentbutton == "year" ? "bg-[#4A4DE6]" : "bg-slate-500"
            } transition-all px-6 py-1 shadow-2xl text-white mr-4`}
            onClick={async () => {
              setcurrentbutton("year");
              setLoading(true);
              const response = await axios.get(
                "https://j77ei0iqfj.execute-api.us-east-1.amazonaws.com/dev/getData",
                {
                  params: {
                    userId: userId,
                    deviceId: deviceId,
                    dateFilter: "year",
                  },
                }
              );

              if (leftTitle == "Corrente")
                setcorrente(
                  response.data.data.corrente.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              if (leftTitle == "Tensão")
                settensao(
                  response.data.data.tensao.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              if (leftTitle == "Potência")
                setpotencia(
                  response.data.data.potencia.map((item) => {
                    const year = new Intl.DateTimeFormat("pt-br", {
                      month: "long",
                    });
                    const day = new Intl.DateTimeFormat("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
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
              setLoading(false);
            }}
          >
            Ano
          </button>
        </div>

        <div className="relative">
          {loading ? (
            <div className="absolute w-full h-full  backdrop-blur-sm bg-white/30 flex justify-center items-center">
              <Loading className="scale-150" />
            </div>
          ) : null}
          <Line
            options={{
              plugins: {
                legend: { display: true, labels: { font: { size: 20 } } },
              },
              scales: {
                y: { grid: { display: false }, ticks: { font: { size: 18 } } },
                x: { ticks: { font: { size: 18 } } },
              },
            }}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
