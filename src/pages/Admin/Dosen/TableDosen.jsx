import Button from "../../../components/atoms/Button.js";

const TableDosen = ({ data = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700 border border-gray-200">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIDN</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                Tidak ada data dosen.
              </td>
            </tr>
          ) : (
            data.map((dosen, index) => (
              <tr key={dosen.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="py-2 px-4">{dosen.nidn}</td>
                <td className="py-2 px-4">{dosen.nama}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Button size="sm" variant="warning" onClick={() => onEdit(dosen)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete(dosen.id)}>
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
