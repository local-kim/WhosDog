import React, { useState, useMemo, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { searchImage} from '../../../_action/search_action';
import Header from '../NavBar/Header';
import { Oval } from '@agney/react-loading';

import Table from './Table';
import NavBarLogin from '../NavBar/NavBarLogin';

export const TableContext = createContext({
    tableData: [],
  })

const SearchPage = (props) => {
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const [tableData, setTableData] = useState([]);
    const [searching, setSearching] = useState(false);
    const dispatch = useDispatch();

    const imageSelected = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);
    };


    const onClickHandler = (e) => {
        console.log(file);
        if(file===''){
            alert('파일을 선택해주세요');
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', file);
        setTableData([]);
        setSearching(true);
        dispatch(searchImage(formData)).
        then( response => {
            setSearching(false);
            setTableData(response.payload.resultList);
            console.log(response.payload.resultList);
        })
    }
    const value = useMemo(() => ({ tableData }), [tableData]);

    return (
        <TableContext.Provider value={value}>
        <Header/>
        <NavBarLogin/>
        <div className="container-custom">
            <div className="card-custom">
            <h3>Upload photo</h3>
            <br/>
            <form className="mr-auto ml-auto w-50 searchForm">
                {(preview === '' )?  <img src="/Images/Icons/icon_image.png" className="w-100 mb-3"/>
                : <img src={preview} className="w-100 h-100 mb-3"/> }
                <input
                className="w-50 mb-2"
                type="file" 
                name="img"
                accept='image/jpg, impge/png, image/jpeg, image/gif'
                onChange={imageSelected}/>
                <button className="searchBtn w-100" onClick={onClickHandler} >Search</button>
            </form>
            { searching ? 
                <div className="searching"><Oval/></div>
             : <Table />}
                
            
            </div>
        </div>
        </TableContext.Provider>
    )
}

export default SearchPage;
