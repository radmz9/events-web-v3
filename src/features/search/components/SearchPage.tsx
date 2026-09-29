import { TextSearch } from 'lucide-react';
import { SearchForm } from './SearchForm';
import { CenterForm } from '../../../common/components/template/CenterForm';

export const SearchPage = () => {
    return(
        <CenterForm
            icon={<TextSearch />}
            title="Consulta tus eventos"
            subTitle="Ingresa tu código para consultar tu historial de eventos"
            text=''
        >
            <SearchForm />
        </CenterForm>
    )
}