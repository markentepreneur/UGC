"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/client/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-custom-pink-light flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="mb-6 text-custom-sage hover:text-custom-sage-dark font-medium flex items-center space-x-2"
        >
          <span>←</span>
          <span>Назад</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Вхід в акаунт
            </h1>
            <p className="text-gray-600">Увійди, щоб продовжити</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-custom-sage focus:border-transparent outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-custom-sage focus:border-transparent outline-none transition-all"
                placeholder="Мінімум 6 символів"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-custom-sage hover:bg-custom-sage-dark text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Завантаження..." : "Увійти"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href={"/client/quiz"}
              className="text-custom-sage hover:text-custom-sage-dark font-medium"
            >
              Немає акаунта? Зареєструйся
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-custom-pink-light rounded-xl p-4">
              <p className="text-xs text-gray-600 text-center">
                Створюючи акаунт, ти отримуєш доступ до всіх матеріалів курсу і
                зможеш почати навчання одразу після оплати обраного плану.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
