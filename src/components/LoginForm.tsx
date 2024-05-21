import { useLocale } from "next-intl";

const LoginForm = () => {
  const locale = useLocale();
  return (
    <form
      action="/api"
      method="POST"
      className="w-1/3 min-w-[250px] lg:w-1/5 border-2 border-yellow-600 dark:border-light_blue shadow-xl shadow-red-300 dark:shadow-light_blue p-8 rounded-xl flex flex-col gap-5 justify-center items-center [&>input]:bg-white"
    >
      <input
        className="w-full h-full border-2 border-yellow-600 dark:border-light_blue py-3 pl-1 text-secondary lg:text-[16px] rounded-[5px] focus:border-orange focus:outline-orange"
        maxLength={100}
        name="username"
        placeholder={locale === "en" ? "Username" : "სახელი"}
        type="text"
        autoCapitalize="none"
        autoComplete="off"
        spellCheck="false"
        required
      />

      <input
        className="w-full h-full border-2 border-yellow-600 dark:border-light_blue  py-3 pl-1 text-secondary lg:text-[16px] rounded-[5px] focus:border-orange focus:outline-orange"
        maxLength={100}
        name="password"
        placeholder={locale === "en" ? "Password" : "პაროლი"}
        type="password"
        autoCapitalize="none"
        autoComplete="off"
        spellCheck="false"
        required
      />

      <div className="w-full flex gap-3">
        <button
          type="submit"
          className="w-full h-full border-0  bg-yellow-600 dark:bg-blue-500 py-3 mx-auto text-white lg:text-[20px] rounded-[5px] hover:bg-orange  dark:hover:bg-orange transition-all transform duration-300 ease-linear"
        >
          {locale === "en" ? "Log In" : "შესვლა"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
