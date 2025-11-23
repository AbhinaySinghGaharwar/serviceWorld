export default function ServiceCard({ service, getIconForService, onSelect }) {
  return (
    <tr className="border-b border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#2A2C31] transition">

      {/* ID */}
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {service.service}
      </td>

      {/* Icon + Name */}
      <td className="px-4 py-3 flex items-center gap-3 text-gray-700 dark:text-gray-300">
        {getIconForService(service.name)}
        <span className="text-sm font-semibold">
          {service.name}
        </span>
      </td>

      {/* Description */}
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-[300px] truncate">
        {service.desc || "-"}
      </td>

      {/* Rate */}
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        ${service.rate}
      </td>

      {/* Min */}
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {service.min}
      </td>

      {/* Max */}
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {service.max}
      </td>

      {/* Action */}
      <td className="px-4 py-3 text-center">
     <button
  onClick={() => onSelect(service)}
  className="
    px-4 py-1 rounded-md 
    bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm 
    hover:bg-gray-300 dark:hover:bg-gray-600 
    transition shadow
  "
>
  View
</button>

      </td>

    </tr>
  );
}
