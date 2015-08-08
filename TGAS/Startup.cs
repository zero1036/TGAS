using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TGAS.Startup))]
namespace TGAS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
