import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';
dotenv.config();

//Configurar cliente de S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export const subirArchivoS3 = async (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = process.env.AWS_DIRECTORY) => {
    return new Promise(async (resolve, reject) => {
        const { archivo } = files;
        console.log("archivo:", archivo);   
        //Dividir nombre y extensión
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

    
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
        }

        //Generar un nombre único para el archivo
        const uniqueFileName = `${carpeta}/${uuidv4()}.${extension}`;
        const { tempFilePath, mimetype } = archivo;

        try {
            //Leemos el archivo temporal
            const fileContent = await readFile(tempFilePath);
            console.log("fileContent:", fileContent);
            // Parámetros para subir el archivo a S3
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: uniqueFileName,
                Body: fileContent,
                ContentType: mimetype,
            };

            //console.log("params:", params);
            //Subimos el archivo a S3 con los parámetros especificados.
            const command = new PutObjectCommand(params);
            await s3.send(command);

            //Construimos la URL segura.
            const secure_url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

            resolve({ secure_url, public_id: uniqueFileName });
        } catch (error) {
            console.error("Error al subir archivo a S3:", error);
            reject(error);
        }
    });
};