import multer from 'multer';

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads/')
    },
    filename:(req,file,callback)=>{
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        callback(null, `${Date.now()}_${safeName}`);
    }
});



export const upload=multer({storage:storage})