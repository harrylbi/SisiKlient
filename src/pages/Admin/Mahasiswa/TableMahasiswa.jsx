import Button from "../../../components/atoms/Button.js";

const TableMahasiswa = ({ data = [], onEdit, onDelete, onDetail }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700 border border-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                Tidak ada data mahasiswa.
              </td>
            </tr>
          ) : (
            data
              .filter((mhs) => mhs && (mhs.id || mhs.nim)) // filter data undefined/null
              .map((mhs, index) => (
                <tr
                  key={mhs.id || `row-${index}`} // fallback jika id kosong
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-2 px-4">{mhs.nim || "-"}</td>
                  <td className="py-2 px-4">{mhs.nama || "-"}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => mhs.id && onDetail(mhs.id)}
                    >
                      Detail
                    </Button>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => onEdit(mhs)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => mhs.id && onDelete(mhs.id)}
                      disabled={!mhs.id} // disable jika id kosong
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
