 import { createContext, useState } from "react";
import runChat from "../config/remini";

 export const Context = createContext();

 const ContextProvider = (props) =>{

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([])
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) =>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }
 
    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await runChat(input)
        }

         let responseArray = response.split("**");
         let newResponse="";
         for(let i=0; i<responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
         }
         let newResponse2 = newResponse.split("*").join("</br>") 
         let newResponseArray =newResponse2.split(" ");
         for(let i=0; i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i]
            delayPara(i,nextWord+" ")
         }
    
        setLoading(false)
        setInput("")
    }
    // onSent("What is react js")

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
 }

 export default ContextProvider

// import { createContext, useState } from "react";
// import runChat from "../config/remini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const onSent = async (prompt) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const result = await runChat(prompt);
//       setResponse(result);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Don't call onSent automatically, call it when needed
//   onSent("What is react js")

//   const contextValue = {
//     onSent,
//     response,
//     loading,
//     error
//   }

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   )
// }

// export default ContextProvider;