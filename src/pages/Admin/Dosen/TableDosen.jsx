import Button from "../../../components/atoms/Button.js";

const TableDosen = ({ data = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      <table className="min-w-full text-sm text-black border-2 border-black bg-white">
        <thead className="bg-green-300 border-b-2 border-black">
          <tr>
            <th className="py-2 px-4 text-left border-r-2 border-black">NIDN</th>
            <th className="py-2 px-4 text-left border-r-2 border-black">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-600">
                Tidak ada data dosen.
              </td>
            </tr>
          ) : (
            data.map((dosen, index) => (
              <tr
                key={dosen.id}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-100 border-t-2 border-black"
                }
              >
                <td className="py-2 px-4 border-r-2 border-black">{dosen.nidn}</td>
                <td className="py-2 px-4 border-r-2 border-black">{dosen.nama}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => onEdit(dosen)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(dosen.id)}
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

export default TableDosen;
