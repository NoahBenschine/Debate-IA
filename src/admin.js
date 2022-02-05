import prisma from "./prismaClient";




async function getAllAdmins(){
 const admins = await prisma.admin.findMany({

   })
   return admins;
}


async function deleteAllAdmins(){
 const admins = await prisma.admin.deleteMany({

   })
   return admins;
}


async function adminInsert(user_id){
  const admin = await prisma.admin.create({
    data:{
      user_id:user_id
    }
  })

}
async function getAdminByUser(user_id){
 const admin = await prisma.admin.findUnique({
       where:{
         user_id:user_id
       }
   })
   return admin;
}


export {getAllAdmins,getAdminByUser,adminInsert};
