"use client";
import { useFormValue } from "@/hooks/useFormValue";
import { fetchRequest, setFormError } from "@/lib/fetchTools";
import { IFetchError } from "@/types/IFetchError";
import { ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { ErrorTypes } from "@/types/ErrorTypes";
import { IUser } from "@/interfaces/IUser";
import { IQuizQuestion } from "@/interfaces/IQuizQuestion";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface Props {
  data: IQuizQuestion[];
}

const QuizClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const questions = data;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<string[]>(
    []
  );
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordView, setShowPasswordView] = useState(false); // NEW: show password entry after registration
  const { formData, onChange, error, setError } = useFormValue({ email: "" });
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFeature, setShowFeature] = useState(false);

  // NEW: state for password input
  const [password, setPassword] = useState("");
  const [passwordInputError, setPasswordInputError] = useState<string | null>(
    null
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (showAnalyzing) {
      const duration = 3000;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setAnalyzingProgress((currentStep / steps) * 100);

        if (currentStep >= steps) {
          clearInterval(timer);
          setTimeout(() => {
            setShowEmailForm(true);
          }, 500);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showAnalyzing]);

  const waitAndShowContinue = () => {
    setShowContinueButton(false);

    setIsLoadingImage(true);
    setIsTransitioning(true);
    setIsLoadingImage(false);
    setTimeout(() => {
      setShowFeature(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setTimeout(() => {
          setShowContinueButton(true);
        }, 1000);
      }, 50);
    }, 100);
  };

  const handleAnswerSelect = (answerId: string) => {
    const currentQ = questions[currentQuestion];

    if (currentQ.multipleChoice) {
      if (multipleChoiceAnswers.includes(answerId)) {
        setMultipleChoiceAnswers(
          multipleChoiceAnswers.filter((a) => a !== answerId)
        );
      } else {
        setMultipleChoiceAnswers([...multipleChoiceAnswers, answerId]);
      }
    } else {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = answerId;
      setSelectedAnswers(newAnswers);

      // Remove focus from the clicked button immediately
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      waitAndShowContinue();
    }
  };

  const handleMultipleChoiceContinue = () => {
    if (multipleChoiceAnswers.length > 0) {
      waitAndShowContinue();
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true);
      setShowContinueButton(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeature(false);
        setMultipleChoiceAnswers([]);
        setIsTransitioning(false);

        // Remove focus from any active element
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 300);
    } else {
      setIsTransitioning(true);
      setShowContinueButton(false);
      setTimeout(() => {
        setShowAnalyzing(true);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // New: Handle password submit (Login after registration)
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setPasswordInputError(null);
    try {
      // Attempt login (assuming endpoint exists)
      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password,
      });
      // Success: Go to course
      router.push("/client/cource");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setPasswordInputError(
        "Невірний пароль або сталася помилка. Спробуй ще раз або перевірь пошту."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchRequest<{ message: string; user: IUser }>(
        "/api/auth/register",
        "POST",
        {
          email: formData.email,
        }
      );

      if (selectedAnswers.length) {
        const userAnswersReq = selectedAnswers.map((answer) => {
          const qusetion = questions.find((q) =>
            q.options.find((a) => a._id === answer)
          );

          return {
            questionId: qusetion?._id,
            userId: res.user._id,
            answerId: answer,
          };
        });

        await fetchRequest<{ message: string; user: IUser }>(
          "/api/quiz/answers/",
          "POST",
          {
            answers: userAnswersReq,
          }
        );
      }

      // Instead of redirecting directly, show password entry view
      setShowPasswordView(true);
    } catch (error) {
      const formError = setFormError(error as IFetchError<{ email: string }>);
      if (formError.email) {
        setError(setFormError(error as IFetchError<{ email: string }>));
      } else {
        setError({ email: "failed" });
      }
    }
  };

  // NEW: Password entry view after registration
  if (showPasswordView) {
    return (
      <div className="h-screen overflow-hidden bg-custom-pink-light flex items-center justify-center px-6 animate-fade-in">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Реєстрація успішна!
            </h1>
            <p className="text-base text-gray-600 mb-1">
              На пошту <span className="font-semibold">{formData.email}</span>{" "}
              надіслано пароль для входу.
            </p>
            <p className="text-base text-gray-600 mb-4">
              Введи цей пароль, щоб отримати доступ до курсу.
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Якщо лист не з&apos;явився — перевір папку &quot;Спам&quot; чи
              &quot;Промоакції&quot;.
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введи пароль з пошти"
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-custom-sage focus:border-custom-sage transition-all duration-200 text-base"
              />
              {passwordInputError && (
                <p className="mt-2 text-sm text-red-600">
                  {passwordInputError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full bg-custom-sage hover:bg-custom-sage-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 active:scale-95${
                isLoggingIn ? " opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? "Перевірка..." : "Увійти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showEmailForm) {
    return (
      <div className="h-screen overflow-hidden bg-custom-pink-light flex items-start pt-16 px-6 animate-fade-in">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Чудово! Ми майже на зв&apos;язку
            </h1>
            <p className="text-base text-gray-600">
              Залиш свій email — надішлю тобі доступ до курсу
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Твій email"
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-custom-sage focus:border-custom-sage transition-all duration-200 text-base"
              />
              {error?.email && (
                <p className="mt-2 text-sm text-red-600">
                  {error.email === ErrorTypes.duplicateValue ? (
                    <>
                      Ця електронна адреса вже використовується.{" "}
                      <Link
                        href="/client/auth/login"
                        className="underline text-custom-sage hover:text-custom-sage-dark transition-colors"
                      >
                        Увійти
                      </Link>
                    </>
                  ) : !!error.email ? (
                    "Не вдалося увійти"
                  ) : (
                    ""
                  )}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-custom-sage hover:bg-custom-sage-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 active:scale-95"
            >
              Отримати курс
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showAnalyzing) {
    return (
      <div className="h-screen overflow-hidden bg-custom-pink-light flex items-center justify-center px-6 animate-fade-in">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-custom-pink mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Збираю для тебе план
            </h1>
            <p className="text-base text-gray-600">
              Дивлюся твої відповіді та підбираю найкраще під твої цілі
            </p>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-custom-sage h-3 rounded-full transition-all duration-300"
                style={{ width: `${analyzingProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {Math.round(analyzingProgress)}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const currSelectedAnswers = currentQ.options.find((option) =>
    selectedAnswers.includes(option._id)
  );
  return (
    <div className="h-screen overflow-hidden bg-custom-pink-light flex flex-col">
      <div className="px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Питання {currentQuestion + 1} з {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-custom-pink h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {isLoadingImage ? (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-custom-pink mx-auto animate-pulse" />
          </div>
        </div>
      ) : !showFeature ? (
        <div className="flex-1 flex items-start pt-8 px-6">
          <div
            className={`max-w-4xl mx-auto w-full transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-900 leading-relaxed">
              {currentQ.question}
            </h1>

            {currentQ.multipleChoice && (
              <p className="text-center text-sm text-gray-600 mb-6">
                Можеш обрати кілька варіантів
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option._id)}
                  className={`w-full font-semibold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-between group focus:outline-none ${
                    currentQ.multipleChoice &&
                    multipleChoiceAnswers.includes(option._id)
                      ? "bg-custom-pink text-white"
                      : "bg-white hover:bg-custom-pink hover:text-white text-gray-900 border-2 border-custom-pink"
                  }`}
                >
                  <span className="text-sm">{option.text}</span>
                  {!currentQ.multipleChoice && (
                    <ChevronRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                  )}
                </button>
              ))}
            </div>

            {currentQ.multipleChoice && (
              <div className="mt-6 max-w-2xl mx-auto">
                <button
                  onClick={handleMultipleChoiceContinue}
                  disabled={multipleChoiceAnswers.length === 0}
                  className="w-full bg-custom-sage hover:bg-custom-sage-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span className="text-sm">Продовжити</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-start pt-8 px-6 overflow-y-auto">
          <div
            className={`max-w-3xl mx-auto w-full py-4 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="text-center mb-4">
              {currentQ.image ? (
                <div className="mb-3">
                  <Image
                    src={currentQ.image}
                    alt={currentQ.title}
                    width={384}
                    height={240}
                    className="w-80 md:w-96 mx-auto object-contain"
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <Image
                    src="/quiz/ugc.png"
                    alt="UGC"
                    width={384}
                    height={240}
                    className="w-80 md:w-96 mx-auto object-contain"
                  />
                </div>
              )}
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                {currSelectedAnswers?.featureTitle || ""}
              </h2>
              <p className="text-base text-gray-600 mb-4">
                {currSelectedAnswers?.featureDescription}
              </p>
            </div>

            <div
              className={`transition-all duration-500 ${
                showContinueButton
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <button
                onClick={handleNext}
                className="w-full bg-custom-sage hover:bg-custom-sage-dark text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span className="text-sm">
                  {currentQuestion < questions.length - 1
                    ? "Продовжимо"
                    : "Завершити квіз"}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizClient;
