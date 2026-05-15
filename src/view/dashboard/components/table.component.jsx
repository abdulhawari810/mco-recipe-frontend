import React from "react";
import { useAllUsers } from "@/hooks/users/useAllUsers.hooks";
import { useUpdateStatusUsers } from "@/hooks/users/useUpdateStatusUsers.hooks";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import NoDataFound from "@/components/no_data_found.component";
import { useUpdateUsers } from "@/hooks/users/useUpdateUsers.hooks";
import { useSingleUsers } from "@/hooks/users/useSingleUsers.hooks";
import FormComponent from "@/components/form.component";

export default function TableComponent({ search, sort, filter }) {
  const { users, error, loading } = useAllUsers({
    search,
    sort,
    filter: JSON.stringify(filter),
  });
  const { updateUsers } = useUpdateUsers();
  const [status, setStatus] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const { updateStatus, loadingUpdateStatus } = useUpdateStatusUsers();
  const [modalId, setModalId] = React.useState(null);
  const { user } = useSingleUsers(selectedUserId);

  // console.log("user", user);

  if (loading)
    return (
      <>
        <div className="w-full h-fit bg-white flex p-4 items-center justify-center">
          <div className="flex flex-col items-center gap-5 justify-center">
            <div className="flex  items-center justify-center">
              <span className="animate-spin w-10 h-10 border-4 border-orange-500 rounded-full border-t-transparent flex items-center justify-center">
                <span className="animate-spin inline-block w-5 h-5 border-4 border-red-500 rounded-full border-t-transparent"></span>
              </span>
            </div>
            <span className="text-black inline-block animate-pulse font-bold text-lg">
              Memuat Data...
            </span>
          </div>
        </div>
      </>
    );
  return (
    <>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Verified</th>
            <th className="px-4 py-2">Total Recipe</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            Array.isArray(users) &&
            users.map((user, index) => (
              <tr key={user.id} className="text-center border-t">
                <td className="px-4 py-2">{index + 1}</td>

                <td className="px-4 py-2">
                  {user.profile !== "default.png" ? (
                    <img
                      src={user.profile}
                      alt="profile"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  ) : (
                    <div className="p-2 bg-gray-200 rounded-full flex items-center justify-center">
                      {renderIcon("User", {
                        className: "w-5 h-5 text-gray-500",
                      })}
                    </div>
                  )}
                </td>

                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>

                <td className="px-4 py-2 capitalize">{user.role}</td>

                <td className="px-4 py-2">
                  {user.is_active == "active" ? (
                    <span className="text-green-600 font-semibold">Aktif</span>
                  ) : user.is_active === "banned" ? (
                    <span className="text-red-500 font-semibold">Banned</span>
                  ) : (
                    <span className="text-orange-500 font-semibold">
                      Tidak Aktif
                    </span>
                  )}
                </td>

                <td className="px-4 py-2">
                  {user.is_verified == "verified" ? (
                    <span className="text-green-600 font-semibold">
                      Verified
                    </span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">
                      Unverified
                    </span>
                  )}
                </td>

                <td className="px-4 py-2">
                  {user.role === "chief" ? user.recipes.length : "-"}
                </td>

                <td className="px-4 py-2 relative">
                  <button
                    onClick={() => {
                      if (modalId === user.id) {
                        setModalId(null);
                      } else {
                        setModalId(user.id);
                      }
                    }}
                    className={
                      modalId === user.id
                        ? "bg-gray-900/5 text-black p-3 rounded-full cursor-pointer"
                        : "text-black p-3 rounded-full cursor-pointer hover:bg-gray-900/5"
                    }
                  >
                    {renderIcon("EllipsisVertical", {
                      className: "w-6 h-6",
                    })}
                  </button>
                  <Modal
                    isOpen={modalId === user.id}
                    onClose={() => {
                      setModalId(null);
                    }}
                    btnClass="hidden"
                    containerClass="absolute top-0 right-20 z-5"
                    bodyClass="bg-white rounded-lg shadow-xl"
                    customClass="p-2"
                    titleClass="hidden"
                    bodyButtonClass="hidden"
                  >
                    <div className="p-4 flex gap-2">
                      <button className="p-2 bg-blue-500 rounded-lg text-white cursor-pointer">
                        Detail
                      </button>
                      <button
                        className="p-2 bg-green-500 rounded-lg text-white cursor-pointer"
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 bg-red-500 rounded-lg text-white cursor-pointer "
                        onClick={() =>
                          updateStatus({
                            id: user.id,
                            payload:
                              user.is_active === "active" ||
                              user.is_active === "in_active"
                                ? { is_active: "banned" }
                                : { is_active: "in_active" },
                          })
                        }
                      >
                        {loadingUpdateStatus ? (
                          <span className="animate-spin inline-block w-5 h-5 border-4 border-white-500 rounded-full border-t-transparent"></span>
                        ) : user.is_active === "active" ? (
                          "Ban"
                        ) : (
                          "Unban"
                        )}
                      </button>
                    </div>
                  </Modal>
                </td>
              </tr>
            ))
          ) : error ? (
            <tr>
              <td colSpan="10" className="text-center py-4">
                <NoDataFound
                  error={error}
                  containerClass="flex items-center justify-center flex-col gap-4"
                  thumbnailClass="w-34 h-34"
                  titleClass="text-gray-500 text-lg"
                />
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">
                <NoDataFound
                  error={"Data users masih kosong"}
                  containerClass="flex items-center justify-center flex-col gap-4"
                  thumbnailClass="w-34 h-34"
                  titleClass="text-gray-500 text-lg"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <FormComponent
        initialData={user}
        showForm={selectedUserId === user?.id}
        onClose={() => setSelectedUserId(null)}
        title="Edit User"
        fields={[
          {
            name: "username",
            label: "Username",
            type: "text",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
          },
          {
            name: "profile",
            label: "Profile URL",
            type: "text",
          },
          {
            name: "role",
            label: "Role",
            type: "select",
            options: [
              { value: "users", label: "User" },
              { value: "admin", label: "Admin" },
              { value: "chief", label: "Chief" },
            ],
          },
          {
            name: "gender",
            label: "Gender",
            type: "select",
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "gay", label: "Gay" },
            ],
          },
          {
            name: "is_active",
            label: "Status Aktif",
            type: "select",
            options: [
              { value: "active", label: "Active" },
              { value: "in_active", label: "In Active" },
              { value: "banned", label: "Banned" },
            ],
          },
          {
            name: "is_verified",
            label: "Verified",
            type: "select",
            options: [
              { value: "verified", label: "Verified" },
              { value: "in_verified", label: "In Verified" },
            ],
          },
        ]}
        defaultForm={{
          username: "",
          email: "",
          profile: "",
          role: "users",
          gender: "male",
          is_active: "active",
          is_verified: "in_verified",
        }}
        onSubmit={(form) => {
          updateUsers({ id: selectedUserId, payload: form });
          setSelectedUserId(null);
        }}
      />
    </>
  );
}
