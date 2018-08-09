using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;

namespace BayAndSell2
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .AddSessionStateTempDataProvider()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver =
                   new DefaultContractResolver());
            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
            });

            services.AddSingleton<IConfiguration>(Configuration);
            services.AddSession();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            DefaultFilesOptions startfiles = new DefaultFilesOptions();
            startfiles.DefaultFileNames.Clear();
            startfiles.DefaultFileNames.Add("OffersList.html");//"Seller.html"
            app.UseDefaultFiles(startfiles);
            var options = new StaticFileOptions {
                ContentTypeProvider = new FileExtensionContentTypeProvider()
            };
            ((FileExtensionContentTypeProvider)options.ContentTypeProvider).Mappings.Add(
                new KeyValuePair<string, string>(".less", "text/css"));
            app.UseStaticFiles(options);
            app.UseSession();
            app.UseMvc();
        }
    }
}
