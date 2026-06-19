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
  const { users, error, loadingUsers } = useAllUsers({
    search,
    sort,
    filter: JSON.stringify(filter),
  });
  const { updateUsers, loadingUpdateUsers } = useUpdateUsers();
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const { updateStatus, loadingUpdateStatus } = useUpdateStatusUsers();
  const { user, loadingSingleUsers } = useSingleUsers(selectedUserId);
  const [actionMenu, setActionMenu] = React.useState(null);

  React.useEffect(() => {
    if (selectedUserId && user && !loadingSingleUsers) {
      setActionMenu(null);
    }
  }, [selectedUserId, user, loadingSingleUsers]);
  return (
    <>
      <div className="w-full overflow-x-scroll rounded-xl border border-gray-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-neutral-900">
            <tr className="text-left text-gray-700 dark:text-neutral-200">
              <th className="px-4 py-3 whitespace-nowrap">No</th>
              <th className="px-4 py-3 whitespace-nowrap">Profile</th>
              <th className="px-4 py-3 whitespace-nowrap">Username</th>
              <th className="px-4 py-3 whitespace-nowrap">Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Role</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Verified</th>
              <th className="px-4 py-3 whitespace-nowrap">Total Recipe</th>
              <th className="px-4 py-3 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-neutral-950 text-gray-700 dark:text-neutral-200">
            {users.length > 0 ? (
              Array.isArray(users) &&
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex justify-center">
                      {user.profile !== "default.png" ? (
                        <img
                          src={user.profile}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                          {renderIcon("User", {
                            className: "w-5 h-5 text-gray-500",
                          })}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">
                    {user.role}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.is_active === "active" ? (
                      <span className="text-green-600 font-semibold">
                        Aktif
                      </span>
                    ) : user.is_active === "banned" ? (
                      <span className="text-red-500 font-semibold">Banned</span>
                    ) : (
                      <span className="text-orange-500 font-semibold">
                        Tidak Aktif
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.is_verified === "verified" ? (
                      <span className="text-green-600 font-semibold">
                        Verified
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-semibold">
                        Unverified
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.role === "chief" ? user.recipes?.length : "-"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap relative">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();

                        setActionMenu(
                          actionMenu?.id === user.id
                            ? null
                            : {
                                id: user.id,
                                user,
                                top: rect.bottom + 8,
                                left: rect.right - 180,
                              },
                        );
                      }}
                      className="p-3 rounded-full hover:bg-gray-100"
                    >
                      {renderIcon("EllipsisVertical", { className: "w-6 h-6" })}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-10 text-center">
                  <NoDataFound
                    error={error || "Data users masih kosong"}
                    containerClass="flex items-center justify-center flex-col gap-4"
                    thumbnailClass="w-34 h-34"
                    titleClass="text-gray-500 text-lg"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {actionMenu && (
        <div
          className="fixed z-9999 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
          style={{
            top: actionMenu.top,
            left: actionMenu.left,
          }}
        >
          <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100">
            Detail
          </button>

          <button
            disabled={loadingSingleUsers}
            className="w-full rounded-lg px-3 py-2 text-left text-green-600 hover:bg-green-50"
            onClick={async () => {
              setSelectedUserId(actionMenu.user.id);
            }}
          >
            {loadingSingleUsers ? (
              <span className="animate-spin inline-block w-5 h-5 border-4 border-white-500 rounded-full border-t-transparent"></span>
            ) : (
              "Edit"
            )}
          </button>

          <button
            className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
            onClick={async () => {
              await updateStatus({
                id: actionMenu.user.id,
                payload:
                  actionMenu.user.is_active === "active" ||
                  actionMenu.user.is_active === "in_active"
                    ? { is_active: "banned" }
                    : { is_active: "in_active" },
              });

              setActionMenu(null);
            }}
          >
            {loadingUpdateStatus ? (
              <span className="animate-spin inline-block w-5 h-5 border-4 border-white-500 rounded-full border-t-transparent"></span>
            ) : actionMenu.user.is_active === "active" ? (
              "Ban"
            ) : actionMenu.user.is_active === "banned" ? (
              "Unban"
            ) : (
              "Ban"
            )}
          </button>
        </div>
      )}

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
