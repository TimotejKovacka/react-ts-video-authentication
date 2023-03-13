import { useCallback, useState, useEffect } from "react";
import EntryPoint from "./components/EntryPoint";
import MultiStepForm from "./components/MultiStepForm";
import PasswordStep from "./components/PasswordStep";
import WatchAuthentication from "./components/WatchAuthentication";
import "./App.css";
import axios from "axios";

interface StepsInterface {
  label: string;
  isValid: boolean | undefined;
}

interface SecretData {
  password: string;
  authSequence: Array<number>;
}

export interface FormData extends SecretData {
  email: string;
  sequenceData: Array<Array<{ title: string; poster_url: string }>>;
}

interface DjangoResponse {
  data: {
    [key: string]: {
      title: string;
      poster_url: string;
      correct_answer: boolean;
    }[];
  };
}

function App() {
  // const [authStep, setAuthStep] = useState<number>(0);
  // const [email, setEmail] = useState<string>("");
  const [formState, setFormState] = useState<FormData>({
    email: "",
    password: "",
    authSequence: [],
    sequenceData: [],
  });

  useEffect(() => {
    const fetchDjango = async () => {
      const { data } = await axios.get<DjangoResponse>(
        "http://localhost:8000/"
      );
      console.log("data", data);
      const indexes = Object.values(data)
        .flatMap((arr) =>
          arr
            .map((item: any, index: number) =>
              item.correct_answer ? index : null
            )
            .filter((i: number) => i !== null)
        )
        .flat();
      console.log("Correct sequence", indexes);
      // convert django response to array of arrays of objects with title and poster_url
      const sequenceData = Object.values(data).map((arr) =>
        arr.map((item: any) => ({
          title: item.title,
          poster_url: item.poster_url,
        }))
      );
      console.log("Correct sequence data", sequenceData);
      setFormState((prevState) => ({
        ...prevState,
        authSequence: indexes,
        sequenceData: sequenceData,
      }));
    };
    fetchDjango();
  }, []);

  return (
    <div className='App'>
      <MultiStepForm formData={formState} setFormData={setFormState} />
      {/* <WatchAuthentication formData={formState} setFormData={setFormState} /> */}
    </div>
  );
}

export default App;
