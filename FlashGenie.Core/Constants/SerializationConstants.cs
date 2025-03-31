
using System.Text.Json.Serialization;
using System.Text.Json;

namespace FlashGenie.Core.Constants
{
    public class SerializationConstants
    {
        public static JsonSerializerOptions serializerOptions = new JsonSerializerOptions()
        {
            Converters = { new JsonStringEnumConverter(allowIntegerValues: false) },
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault,
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }
}
