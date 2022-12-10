import "chart.js/auto";
import dynamic from "next/dynamic";
import { Line } from "react-chartjs-2";

import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Loading from "./loading";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});
import { useRouter } from "next/router";
export default function ChartLine({
  data,
  leftTitle,
  leftSubtitle,
  leftValue,
  currentleftValueText,
  rightTitle,
  leftSrc,
  setmodaldata,
  modalcontent,
  potencia,
  custKWH,
  setpotencia,
  setgastomensal,
  setgastoCustoAtual,
  setgastoPotenciaAtual,
  setgastoTensãoAtual,
  setgastoCorrenteAtual,
  setcorrente,
  settensao,
  currentbutton,
  setcurrentbutton,
}) {
  const router = useRouter();
  const { deviceId, userId } = router.query;
  const [intervaldata, setintervaldata] = useState(null);
  useEffect(() => {
    setLoading(true);
    if (currentbutton == "month")
      setgastomensal(
        potencia.map((item) => {
          return {
            ...item,
            y: parseFloat((((item.y * custKWH) / 1000) * 24).toFixed(2)),
          };
        })
      );
    if (currentbutton == "year")
      setgastomensal(
        potencia.map((item) => {
          const watt = item.y;
          let hoursInMonth = 720;
          const começoDeHoje = moment().startOf("month");
          const now = moment();
          var format = new Intl.DateTimeFormat("pt-br", {
            month: "long",
          });
          if (item.x == format.format(new Date())) {
            hoursInMonth = now.diff(começoDeHoje, "hour");
          }
          return {
            ...item,
            y: parseFloat(((watt * custKWH * hoursInMonth) / 1000).toFixed(2)),
          };
        })
      );
    if (currentbutton == "day")
      setgastomensal(
        potencia.map((item) => {
          return {
            ...item,
            y: parseFloat((item.y * custKWH * 0.0166667) / 1000),
          };
        })
      );
    setLoading(false);
  }, [custKWH, potencia]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (currentbutton == "day") {
      const interval = setInterval(async () => {
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
        setgastoCorrenteAtual(response.data.data.correnteAtual);
        setgastoPotenciaAtual(response.data.data.potenciaAtual);
        setgastoTensãoAtual(response.data.data.tensaoAtual);
      }, 10000);
      setintervaldata(interval);
    } else {
      if (intervaldata != null) clearInterval(intervaldata);
    }
  }, [currentbutton]);

  return (
    <div className="flex 2xl:flex-row flex-col items-center justify-evenly mt-4 mb-6 bg-white rounded-lg shadow-lg mx-10">
      <div className="flex flex-col items-center justify-center   2xl:h-[500px] 2xl:w-auto w-full mb-10 2xl:mb-0 lg-aspect-square p-8">
        <div className="flex flex-row justify-start items-center w-full">
          <div className="flex flex-col justify-start items-start mt-12">
            <span className="font-semibold">{leftTitle}</span>
            <span className=" text-slate-400 font-medium">{leftSubtitle}</span>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center">
          <img src={leftSrc} />
          <ReactSpeedometer
            ringWidth={20}
            valueTextFontSize={"1.6rem"}
            segmentColors={["#4A4DE6", "#e3e6e4"]}
            segments={2}
            minValue={0}
            textColor="#4A4DE6"
            maxValue={500}
            paddingVertical={15}
            value={parseFloat(leftValue.toFixed(2))}
            needleColor="steelblue"
            customSegmentStops={[0, parseFloat(leftValue.toFixed(2)), 500]}
            currentValueText={currentleftValueText}
          />
        </div>

        <div className="flex flex-row mr-56 pb-12 ">
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

      <div className="h-[450px] w-[1px] bg-purple-200 2xl:flex hidden" />
      <div className="2xl:h-[500px] 2xl:w-[1000px] w-full mb-10 2xl:mb-0  p-16 justify-center flex flex-col">
        <div className="flex flex-row">
          <span className="mr-40 font-semibold text-lg">{rightTitle}</span>

          <button
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
              setgastomensal(
                response.data.data.potencia.map((item) => {
                  return {
                    ...item,
                    y: parseFloat(
                      (((item.y * custKWH) / 1000) * 0.0167).toFixed(2)
                    ),
                  };
                })
              );
              setLoading(false);
            }}
            className={`rounded-full ${
              currentbutton == "day" ? "bg-[#4A4DE6]" : "bg-slate-500"
            }  transition-all px-6 py-1 shadow-2xl text-white mr-4`}
          >
            Dia
          </button>
          <button
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
              setgastomensal(
                response.data.data.potencia.map((item) => {
                  return {
                    ...item,
                    y: parseFloat(((item.y * custKWH * 24) / 1000).toFixed(2)),
                  };
                })
              );
              setLoading(false);
            }}
            className={`rounded-full ${
              currentbutton == "month" ? "bg-[#4A4DE6]" : "bg-slate-500"
            }  transition-all px-6 py-1 shadow-2xl text-white mr-4`}
          >
            Mês
          </button>
          <button
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

              setgastomensal(
                response.data.data.potencia.map((item) => {
                  const watt = item.y;
                  let hoursInMonth = 720;
                  const começoDeHoje = moment().startOf("month");
                  const now = moment();
                  var format = new Intl.DateTimeFormat("pt-br", {
                    month: "long",
                  });
                  if (item.x == format.format(new Date())) {
                    hoursInMonth = now.diff(começoDeHoje, "hour");
                  }
                  return {
                    ...item,
                    y: parseFloat(
                      ((watt * custKWH * hoursInMonth) / 1000).toFixed(2)
                    ),
                  };
                })
              );
              setLoading(false);
            }}
            className={`rounded-full ${
              currentbutton == "year" ? "bg-[#4A4DE6]" : "bg-slate-500"
            }  transition-all px-6 py-1 shadow-2xl text-white mr-4`}
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
