import { useEffect, useRef, useState } from "react";
import Modal from "@/components/modal.component";
import { useTranslation } from "react-i18next";
import { useAuthUpdatePassword } from "@/hooks/auth/useUpdatePassword.hooks";
import { renderIcon } from "@/utils/icons.utils";
import toast from "react-hot-toast";
import { useSetup2FAS } from "@/hooks/qrcode/useQrCode.hooks";
import { useVerify2FAS } from "@/hooks/qrcode/useVerify2FAS.hooks";
import { useDisable2FAS } from "@/hooks/qrcode/useDisable2FAS.hooks";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useDeleteUsers } from "@/hooks/users/useDeleteUsers.hooks";
import { logoutUser } from "@/services/auth.services";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function SecuritySection() {
  const { setup2fas } = useSetup2FAS();
  const { Verify2FASData, loadingVerify2FAS } = useVerify2FAS();
  const { disable2FASData, loadingDisable2FAS } = useDisable2FAS();
  const { me } = useAuth();
  const { deleteUsers } = useDeleteUsers();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const [buttonStep, setButtonStep] = useState(() => {
    return me?.two_factor_enabled === "active" || false;
  });
  const [showModal, setShowModal] = useState(() => {
    return localStorage.getItem("modal_active") || false;
  });
  const [modalType, setModalType] = useState(() => {
    return localStorage.getItem("modal") || "";
  });
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confPassword: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { updateAuthPassword } = useAuthUpdatePassword();

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      newOtp[index] = char;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length - 1, otp.length - 1);

    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAuthPassword({
      password,
      newPassword,
      confPassword,
    });
    setForm({
      password: "",
      newPassword: "",
      confPassword: "",
    });
    setShowModal(false);
    setModalType("");
  };

  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const scrollToSecond = (smooth = true) => {
    secondRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "nearest",
      inline: "start",
    });
  };
  const scrollToFirst = (smooth = true) => {
    firstRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "nearest",
      inline: "start",
    });
  };

  const switchScan = () => {
    localStorage.setItem("2fas_step", "verify");
    scrollToSecond(true);
  };
  useEffect(() => {
    const savedStep = localStorage.getItem("2fas_step");

    if (savedStep === "verify") {
      setTimeout(() => {
        scrollToSecond(false);
      }, 0);
    } else {
      setTimeout(() => {
        scrollToFirst(false);
      }, 0);
    }
  }, []);

  const test = JSON.parse(localStorage.getItem("qrcode"));
  return (
    <>
      <main className="w-full h-full">
        <div className="flex flex-col min-w-full w-full bg-white dark:text-white dark:bg-neutral-900 p-6 rounded-2xl">
          <div className="flex items-center mb-5">
            <h1 className="font-bold text-xl">{t("security.title")}</h1>
          </div>
          <div className="grid grid-cols-2 border-b py-10 border-slate-300 dark:border-neutral-700">
            <div className="flex flex-col w-full gap-2">
              <h1 className="text-md md:text-lg font-semibold">
                {t("security.password.title")}
              </h1>
              <span className="text-xs md:text-lg text-slate-500 dark:text-orange-200/70">
                {t("security.password.text")}
              </span>
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                className="p-2.5 rounded-full outline outline-slate-500 dark:outline-orange-500 dark:text-orange-500 flex items-center justify-center text-md cursor-pointer text-slate-600"
                onClick={() => {
                  setShowModal(true);
                  setModalType("password");
                  localStorage.setItem("modal", "password");
                  localStorage.setItem("modal_active", true);
                }}
              >
                {t("common.edit")} {t("common.password")}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 border-b py-10 border-slate-300 dark:border-neutral-700">
            <div className="flex flex-col gap-1 w-full">
              <h1 className="text-md md:text-lg font-semibold">
                {t("security.two_step_verification.title")}
              </h1>
              <span className="text-xs md:text-lg text-slate-500 dark:text-orange-200/70">
                {t("security.two_step_verification.text")}
              </span>
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                className={`p-2 w-15 rounded-full outline ${buttonStep ? "outline-orange-500" : "outline-slate-500"} flex items-center justify-center text-md cursor-pointer text-slate-600`}
                onClick={() => {
                  if (me?.two_factor_enabled === "active") {
                    setModalType("disable");
                    setShowModal(true);
                    return;
                  }
                  setButtonStep(true);
                  setup2fas({ payload: { active: true } });
                  setShowModal(true);
                  setModalType("2fa");
                }}
              >
                <div
                  className={`w-5 h-5 rounded-full transform ${buttonStep ? "bg-orange-500 translate-x-3" : "-translate-x-3 bg-slate-500"} transition-transform! duration-300`}
                ></div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 py-10">
            <div className="flex flex-col gap-1 w-full">
              <h1 className="text-md md:text-lg font-semibold">
                {t("security.delete_account.title")}
              </h1>
              <span className="text-xs md:text-lg text-slate-500 dark:text-orange-200/70">
                {t("security.delete_account.text")}
              </span>
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                className={`p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-red-500 dark:text-orange-500`}
                onClick={() => {
                  setModalType("delete");
                  setShowModal(true);
                }}
              >
                <span>{t("common.delete")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* POPUP UPDATE PASSWORD */}
        <Modal
          isOpen={showModal && modalType === "password"}
          onClose={() => setShowModal(false)}
          title={t("common.change_password")}
          bodyClass="bg-white dark:bg-neutral-900 w-full md:w-1/2 rounded-lg overflow-hidden z-50"
          titleClass="bg-gray-200 dark:bg-neutral-800 dark:text-white p-4"
          btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
          containerClass="bg-black/50 fixed px-10 md:px-0 top-0 left-0 w-full h-full flex items-center justify-center z-50"
          customClass="p-4 flex flex-col z-100 gap-4 items-center justify-center rounded-lg w-full "
          bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
          btnTitleCancel={t("common.btn_cancel")}
          btnTitleConfirm={t("common.btn_confirm")}
          btnConfirmClass="bg-orange-500 text-black! text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
          btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
          btnCancel={() => {
            setForm({
              password: "",
              newPassword: "",
              confPassword: "",
            });
            setShowModal(false);
            setModalType("");
            localStorage.setItem("modal", "");
            localStorage.setItem("modal_active", false);
          }}
          btnConfirm={handleSubmit}
        >
          <div className="flex flex-col md:w-2/3 w-full items-center justify-center gap-10 py-10">
            <div className="relative w-full flex items-center justify-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                id="password"
                placeholder=" "
                className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 dark:text-orange-500 outline-slate-400 dark:outline-orange-400 rounded-lg px-3 h-12"
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="absolute left-3 transition-all! dark:text-orange-200 text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white dark:peer-focus:bg-neutral-800 peer-focus:left-2 peer-focus:text-orange-500 px-2"
              >
                {t("common.password")} {t("common.old")}
              </label>
              <button
                type="button"
                className={`absolute right-5 cursor-pointer ${showPassword ? "text-black dark:text-orange-500" : "text-slate-500 dark:text-orange-500/50"}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {renderIcon("Eye", { className: "w-5 h-5" })}
              </button>
            </div>
            <div className="relative w-full  flex items-center justify-center">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                placeholder=" "
                className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 dark:text-orange-500 outline-slate-400 dark:outline-orange-400 rounded-lg px-3 h-12"
                autoComplete="off"
              />
              <label
                htmlFor="newPassword"
                className="absolute left-3 transition-all! dark:text-orange-200 text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white dark:peer-focus:bg-neutral-800 peer-focus:left-2 peer-focus:text-orange-500 px-2"
              >
                {t("common.password")} {t("common.new")}
              </label>
            </div>
            <div className="relative w-full  flex items-center justify-center">
              <input
                type={showPassword ? "text" : "password"}
                name="confPassword"
                value={form.confPassword}
                onChange={(e) =>
                  setForm({ ...form, confPassword: e.target.value })
                }
                id="confPassword"
                placeholder=" "
                className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 dark:text-orange-500 outline-slate-400 dark:outline-orange-400 rounded-lg px-3 h-12"
                autoComplete="off"
              />
              <label
                htmlFor="confPassword"
                className="absolute left-3 transition-all! dark:text-orange-200 text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white dark:peer-focus:bg-neutral-800 peer-focus:left-2 peer-focus:text-orange-500 px-2"
              >
                {t("common.confirm")} {t("common.password")} {t("common.new")}
              </label>
            </div>
          </div>
        </Modal>
        {/* POPUP ENABLE 2 FACTOR AUTHENTICATION */}
        <Modal
          isOpen={showModal && modalType === "2fa"}
          // isOpen={true}
          onClose={() => setShowModal(false)}
          custom={true}
        >
          <section className="fixed md:pt-30 pt-20 w-full h-screen md:px-10 z-1000 bg-slate-200 dark:bg-neutral-950 flex flex-col">
            <div className="flex flex-col rounded-t-2xl dark:bg-neutral-900 bg-white md:bg-none lg:bg-none">
              <div className="relative md:absolute top-0 left-0 w-full p-10 md:h-20 dark:bg-neutral-900 bg-white flex items-center justify-between">
                <h1 className="font-bold md:text-2xl text-lg text-orange-500 dark:text-white">
                  {t("security.2_factor.title")}
                </h1>
                <div className="flex items-center gap-5">
                  <span className="hidden md:flex">
                    {renderIcon("CircleQuestionMark", { className: "w-5 h-5" })}
                  </span>
                  <button
                    type="button"
                    className="text-orange-500 hidden md:flex uppercase p-2.5 px-5 font-semibold cursor-pointer bg-orange-500/10 rounded-2xl"
                    onClick={() => {
                      localStorage.setItem("modal", "");
                      localStorage.setItem("modal_active", false);
                      localStorage.removeItem("2fas_step");
                      setShowModal(false);
                      setModalType("");
                      setButtonStep(false);
                      setOtp(["", "", "", "", "", ""]);
                    }}
                  >
                    {t("common.close")}
                  </button>
                  <button
                    type="button"
                    className="text-orange-500 flex md:hidden uppercase p-2.5 px-5 font-semibold cursor-pointer bg-orange-500/10 rounded-2xl"
                    onClick={() => {
                      localStorage.setItem("modal", "");
                      localStorage.setItem("modal_active", false);
                      localStorage.removeItem("2fas_step");
                      setShowModal(false);
                      setModalType("");
                      setButtonStep(false);
                      setOtp(["", "", "", "", "", ""]);
                    }}
                  >
                    {renderIcon("X", { className: "w-5 h-5" })}
                  </button>
                </div>
              </div>

              <div className="overflow-hidden w-full flex items-center justify-between">
                <div className="flex w-full">
                  <div
                    className={`w-full min-w-full shrink-0 h-full flex items-center justify-center flex-col md:grid md:grid-cols-2 p-15 rounded-2xl transition-transform duration-300`}
                    ref={firstRef}
                  >
                    <div className="md:flex hidden flex-col">
                      <h1 className="text-4xl font-bold text-black dark:text-white">
                        {t("security.2_factor.title_header")}
                      </h1>
                      <p className="text-md font-medium text-slate-500 dark:text-orange-200 mt-5 mb-10">
                        {t("security.2_factor.paragraph_header")}
                      </p>
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-5">
                          <span className="px-4 py-2.5 flex items-center justify-center rounded-xl bg-orange-500 text-black font-black">
                            1
                          </span>
                          <h3 className="font-medium text-slate-500 dark:text-orange-200">
                            {t("security.2_factor.step1.text")}{" "}
                            <span className="text-slate-950 dark:text-orange-500">
                              {t("security.2_factor.step1.text2")}{" "}
                            </span>
                            {t("security.2_factor.step1.text3")}
                          </h3>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="px-4 py-2.5 flex items-center justify-center rounded-xl bg-orange-500 text-black font-black">
                            2
                          </span>
                          <h3 className="font-medium text-slate-500 dark:text-orange-200">
                            {t("security.2_factor.step2.text")}{" "}
                            <span className="text-slate-950 dark:text-orange-500">
                              "+"
                            </span>{" "}
                            {t("security.2_factor.step2.text2")}{" "}
                            <span className="text-slate-950 dark:text-orange-500">
                              "{t("security.2_factor.step2.text3")}"
                            </span>
                            .
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="flex  w-full min-w-full flex-col items-center justify-center gap-5">
                      <img
                        src={test?.qrcode}
                        alt="QR Code"
                        className="w-50 h-50 rounded-lg object-cover"
                      />
                      <span className="bg-orange-500/10 rounded-lg p-2.5 px-5 flex items-center justify-center gap-2 text-orange-500">
                        <span className="relative flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-orange-500"></span>
                        </span>
                        <span>{t("security.2_factor.text_animation")}...</span>
                      </span>
                      <button
                        type="button"
                        className="w-1/2 rounded-lg font-bold text-lg h-12 bg-orange-500 text-black flex items-center justify-center cursor-pointer"
                        onClick={switchScan}
                      >
                        {t("common.done")}
                      </button>
                    </div>
                  </div>
                  <div
                    className="w-full min-w-full shrink-0 flex flex-col items-center overflow-hidden rounded-2xl  justify-center"
                    ref={secondRef}
                  >
                    <div className="flex flex-col items-center justify-center bg-white dark:text-white dark:bg-neutral-900 p-15 rounded-2xl">
                      <span className="flex items-center justify-center p-5 bg-orange-500/10 text-orange-500 rounded-full">
                        {renderIcon("FingerprintPattern", {
                          className: "w-10 h-10",
                        })}
                      </span>
                      <h1 className="font-bold md:text-2xl text-lg mt-5">
                        {t("security.verify_2_factor.title")}
                      </h1>
                      <p className="text-center text-sm md:text-lg text-slate-700 dark:text-orange-200 mt-2.5">
                        {t("security.verify_2_factor.paragraph")}
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex gap-3 my-5">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (inputRefs.current[index] = el)}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) =>
                                handleChange(e.target.value, index)
                              }
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              onPaste={handlePaste}
                              className="w-12 h-12 bg-slate-50 dark:bg-neutral-800 border dark:border-orange-400 dark:text-orange-500 border-slate-600 rounded-md text-center text-black text-xl font-bold outline-none focus:border-orange-500"
                            />
                          ))}
                        </div>
                        <button
                          className="bg-orange-500 w-full text-black cursor-pointer h-12 rounded-lg text-lg font-bold"
                          type="button"
                          disabled={loadingVerify2FAS}
                          onClick={async () => {
                            const code = otp.join("");
                            if (code.length !== 6) {
                              return toast.error("OTP harus 6 digit");
                            }
                            await Verify2FASData({ token: code });
                            if (!loadingVerify2FAS) {
                              setShowModal(false);
                              setModalType("");
                              setOtp(["", "", "", "", "", ""]);
                            }
                          }}
                        >
                          {loadingVerify2FAS && (
                            <span className="rounded-full w-5 h-5 border-2 border-t-transparent border-white animate-spin"></span>
                          )}
                          {loadingVerify2FAS ? (
                            <span>{t("common.verifying")}</span>
                          ) : (
                            <span>{t("common.verification")}</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal>
        {/* POPUP CONFIRM DELETE AKUN */}
        <Modal
          isOpen={showModal && modalType === "delete"}
          onClose={(e) => {
            setIsModalOpen(false);
            setModalType("");
          }}
          btnCancel={() => {
            setShowModal(false);
            setModalType("");
          }}
          btnConfirm={async () => {
            try {
              await deleteUsers();
              await logoutUser();
              queryClient.clear();
              setShowModal(false);
              setModalType("");
              nav("/");
            } catch (error) {
              console.log(error);
            }
          }}
          titleClass="bg-gray-200 dark:bg-neutral-800 dark:text-white p-4"
          btnTitleCancel={"Cancel"}
          bodyClass="bg-white dark:bg-neutral-900 w-1/2 rounded-lg overflow-hidden z-1000"
          containerClass="bg-black/50 fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
          btnTitleConfirm={"Yes, Delete it"}
          title={"Apakah anda yakin ingin menghapus?"}
          btnCancelClass="bg-gray-300 dark:bg-white dark:text-gray-900 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
          btnConfirmClass="dark:bg-orange-500 text-black! text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        >
          <p className="text-md text-slate-700 dark:text-orange-200/70">
            Akun Anda akan dihapus, tetapi anda bisa mengambil kembali akun ada
          </p>
        </Modal>
        {/* POPUP CONFIRM DISABLE 2FA */}
        <Modal
          isOpen={showModal && modalType === "disable"}
          onClose={(e) => {
            setIsModalOpen(false);
            setModalType("");
          }}
          btnCancel={() => {
            setShowModal(false);
            setModalType("");
          }}
          btnConfirm={async () => {
            try {
              setModalType("confirm-otp-2fas");
              setShowModal(true);
            } catch (error) {
              console.log(error);
            }
          }}
          titleClass="bg-gray-200 dark:bg-neutral-800 dark:text-white p-4"
          btnTitleCancel={"Batalkan"}
          bodyClass="bg-white dark:bg-neutral-900 w-1/2 rounded-lg overflow-hidden z-1000"
          containerClass="bg-black/50 fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
          btnTitleConfirm={"Yes, Nonaktifkan"}
          title={"Apakah anda yakin ingin menonaktifkan?"}
          btnCancelClass="bg-gray-300 dark:bg-white dark:text-gray-900 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
          btnConfirmClass="bg-orange-500 text-black! text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        >
          <p className="text-md text-slate-700 dark:text-orange-200/70">
            Apakah anda menonaktifkan verifikasi 2 langkah?
          </p>
        </Modal>
        {/* POPUP CONFIRM CODE OTP 2FA */}
        <Modal
          isOpen={showModal && modalType === "confirm-otp-2fas"}
          onClose={(e) => {
            setIsModalOpen(false);
            setModalType("");
          }}
          btnCancel={() => {
            setShowModal(false);
            setModalType("");
            setOtp(["", "", "", "", "", ""]);
          }}
          btnConfirm={async () => {
            try {
              const code = otp.join("");
              if (code.length !== 6) {
                return toast.error("OTP harus 6 digit");
              }
              await disable2FASData({ token: code });

              if (!loadingDisable2FAS) {
                setShowModal(false);
                setModalType("");
                setOtp(["", "", "", "", "", ""]);
              }
            } catch (error) {
              console.log(error);
            }
          }}
          titleClass="bg-gray-200 dark:bg-neutral-800 dark:text-white p-4"
          btnTitleCancel={"Batalkan"}
          bodyClass="bg-white dark:bg-neutral-900 w-1/2 rounded-lg overflow-hidden z-1000"
          containerClass="bg-black/50 fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
          btnTitleConfirm={
            <>
              {loadingVerify2FAS && (
                <span className="rounded-full w-5 h-5 border-2 border-t-transparent border-white animate-spin"></span>
              )}
              {loadingVerify2FAS ? (
                <span>{t("common.verifying")}</span>
              ) : (
                <span>{t("common.verification")}</span>
              )}
            </>
          }
          title={"Verifikasi Kode OTP"}
          btnCancelClass="bg-gray-300 dark:bg-white dark:text-gray-900 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
          btnConfirmClass="bg-orange-500 text-black! text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        >
          <div className="flex flex-col items-center justify-center mb-10 gap-2">
            <h1 className="dark:text-white font-bold text-2xl">
              Konfirmasi kode OTP
            </h1>
            <p className="dark:text-orange-200/70 font-medium text-lg">
              Masukkan kode otp yang ada di aplikasi 2FAS anda
            </p>
          </div>
          <div className="flex items-center justify-center w-full gap-5 mb-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 bg-slate-50 dark:bg-neutral-800 border dark:border-orange-400 dark:text-orange-500 border-slate-600 rounded-md text-center text-black text-xl font-bold outline-none focus:border-orange-500"
              />
            ))}
          </div>
        </Modal>
      </main>
    </>
  );
}
