using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FlatSite.Startup))]
namespace FlatSite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
