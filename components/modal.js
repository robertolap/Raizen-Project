export default function Modal({ varsetmodaldata, varmodaldata, varmodalimag }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white py-4 px-12 justify-center items-center  rounded-xl ">
        <h1 className="text-4xl mb-4 font-bold text-center mt-8 text-[#4A4DE6]">
          {varmodaldata.title}
        </h1>
        <h2 className="text-2xl text-bold justify-center pt-8 flex items-center text-center text-justify w-[1000px]">
          {varmodaldata.text}
        </h2>
        <button
          onClick={() => {
            varsetmodaldata(null);
          }}
          className="mt-14 bg-indigo-500 px-8 py-2 ml-[28rem] mb-4 rounded-md text-2xl flex justify-center items-center text-white font-semibold"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
