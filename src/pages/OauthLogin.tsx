import LoadingModal from "../components/LoadingModal.tsx";
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const OauthLogin = () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  const session = params.get('session')
  const navigate = useNavigate()
  const [, setCookies] = useCookies()

  useEffect(() => {
    setCookies(import.meta.env.VITE_COOKIE_NAME, session, {
      sameSite: 'none',
      secure: true,
      path: '/',
    });

    toast.success('Success !', {
      duration: 1000,
      style: {
        backgroundColor: '#fff',
        width: '16rem',
        fontSize: '20px',
      },
    });

    navigate('/')
  }, []);

  return <LoadingModal isOpen={true}/>
}

export default OauthLogin