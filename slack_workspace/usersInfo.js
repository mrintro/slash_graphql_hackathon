app.event('team_join', async ({ payload, context }) => {

    try {
     const result = await app.client.users.info({
       token: context.botToken,
       user: payload.user.id
     });
 
     console.log(result);
   }
   catch (error) {
     console.error(error);
   }
 });