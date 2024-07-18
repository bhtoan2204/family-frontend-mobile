import { useSelector } from 'react-redux';
import { selectLanguage } from 'src/redux/slices/languageSlice';

const useTranslate = () => {
  const selectedLanguage = useSelector(selectLanguage);

};

export default useTranslate;
