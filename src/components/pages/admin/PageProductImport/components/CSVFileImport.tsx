import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import mime from 'mime-types';
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 3),
    },
}));

type CSVFileImportProps = {
    url: string,
    title: string
};

export default function CSVFileImport({url, title}: CSVFileImportProps) {
    const classes = useStyles();
    const [file, setFile] = useState<any>();

    useEffect(() => {
        const login = 'maximsan';
        const password = 'TEST_PASSWORD';
        const authorization_token = `Basic ${btoa(`${login}:${password}`)}`
        localStorage.setItem('login', login);
        localStorage.setItem('password', password);
        localStorage.setItem('authorization_token', authorization_token);
    }, [])

    const onFileChange = (e: any) => {
        console.log(e);
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        setFile(files.item(0));
    };

    const removeFile = () => {
        setFile('');
    };

    const uploadFile = async (e: any) => {
            // Get the presigned URL
            const login = localStorage.getItem('login');
            const password = localStorage.getItem('password');
            const authorization_token = localStorage.getItem('authorization_token');

            let encodedToken = '';
            if (login && password) {
                const data = `${login}:${password}`;
                encodedToken = `Basic ${btoa(data || "")}`;
            } else if (authorization_token) {
                encodedToken = authorization_token;
            }

            const response = await axios({
                method: 'GET',
                url,
                params: {
                    name: encodeURIComponent(file.name)
                },
                headers: {
                    Authorization: encodedToken
                }
            })
            console.log(`File: ${file}`);
            console.log(`File to upload: ${file.name}`)
            console.log(`Uploading to: ${response.data}`)

            const result = await fetch(response.data, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': mime.lookup(file.name) as string,
                }
            })

            if (result.ok) {
                toast.success('File successfully uploaded')
            } else {
                toast.error(result.statusText);
            }

            console.log('Result: ', result)
            setFile('');
        }
    ;

    return (
        <div className={classes.content}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            {!file ? (
                <input type="file" onChange={onFileChange}/>
            ) : (
                <div>
                    <button onClick={removeFile}>Remove file</button>
                    <button onClick={uploadFile}>Upload file</button>
                </div>
            )}
        </div>
    );
}
