import { X, Mail, Phone, MapPin } from "lucide-react";

const mockCHWUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@health.gov",
    phone: "+250 788 123 456",
    location: "Kigali, Gasabo",
    status: "online",
    lastActive: "2 minutes ago",
    patientsAssigned: 45,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@health.gov",
    phone: "+250 788 234 567",
    location: "Kigali, Kicukiro",
    status: "online",
    lastActive: "5 minutes ago",
    patientsAssigned: 38,
  },
  {
    id: 3,
    name: "Catherine Uwimana",
    email: "catherine.uwimana@health.gov",
    phone: "+250 788 345 678",
    location: "Kigali, Nyarugenge",
    status: "online",
    lastActive: "1 minute ago",
    patientsAssigned: 52,
  },
  {
    id: 4,
    name: "David Mugisha",
    email: "david.mugisha@health.gov",
    phone: "+250 788 456 789",
    location: "Kigali, Gasabo",
    status: "away",
    lastActive: "15 minutes ago",
    patientsAssigned: 41,
  },
];

// CHW Users Modal
export const CHWUsersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Registered Community Health Workers
            </h3>
            <p className="text-gray-600 mt-1">Currently logged in CHW users</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCHWUsers.map((chw) => (
            <div
              key={chw.id}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    {/* <User className="w-6 h-6 text-teal-600" /> */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{chw.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          chw.status === "online"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1 ${
                            chw.status === "online"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        ></span>
                        {chw.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {chw.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {chw.patientsAssigned}
                  </div>
                  <div className="text-xs text-gray-500">patients</div>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {chw.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {chw.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {chw.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {mockCHWUsers.length} active CHW users
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
