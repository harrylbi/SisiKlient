import Button from "../../../components/atoms/Button.js";

const TableMahasiswa = ({ data = [], onEdit, onDelete, onDetail }) => {
  return (
    <div className="overflow-x-auto border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-lg bg-white">
      <table className="min-w-full text-sm text-black border-collapse font-bold">
        <thead className="bg-yellow-300 border-b-4 border-black uppercase">
          <tr>
            <th className="py-3 px-4 text-left border-2 border-black">NIM</th>
            <th className="py-3 px-4 text-left border-2 border-black">Nama</th>
            <th className="py-3 px-4 text-center border-2 border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500 border-2 border-black">
                Tidak ada data mahasiswa.
              </td>
            </tr>
          ) : (
            data
              .filter((mhs) => mhs && (mhs.id || mhs.nim))
              .map((mhs, index) => (
                <tr
                  key={mhs.id || `row-${index}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-3 px-4 border-2 border-black">{mhs.nim || "-"}</td>
                  <td className="py-3 px-4 border-2 border-black">{mhs.nama || "-"}</td>
                  <td className="py-3 px-4 text-center border-2 border-black space-x-2">
                    <Button
                      className="bg-blue-400 hover:bg-blue-500 text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase"
                      onClick={() => mhs.id && onDetail(mhs.id)}
                    >
                      Detail
                    </Button>
                    <Button
                      className="bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase"
                      onClick={() => onEdit(mhs)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-400 hover:bg-red-500 text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase"
                      onClick={() => mhs.id && onDelete(mhs.id)}
                      disabled={!mhs.id}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableMahasiswa;
