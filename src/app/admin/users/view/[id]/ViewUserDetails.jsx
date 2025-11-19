"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Mail,
  UserCircle2,
  Calendar,
  Hash,
  ImageOff,
  Download,
  FileDown,
  FileText,
  FileType,
  X,
} from "lucide-react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function ViewUserDetails({ user }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 text-lg p-4 text-center">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300 text-lg p-4 text-center">
        Loading user...
      </div>
    );

  const profilePic =
    user.profilePic || user.avatar || user.image || user.photo || null;

  // shorten long base64 or long string values
  const shorten = (text, max = 80) => {
    if (!text) return "";
    text = String(text);
    return text.length > max ? text.substring(0, max) + "..." : text;
  };

  // Export JSON
  const exportAsJSON = () => {
    const blob = new Blob([JSON.stringify(user, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.name || "user"}.json`;
    link.click();
  };

  // Export PDF
  const exportAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14).text("User Details", 14, 20);
    doc.setFontSize(10);

    let y = 30;
    for (const [key, value] of Object.entries(user)) {
      doc.text(`${key}: ${String(value)}`, 14, y);
      y += 7;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    }
    doc.save(`${user.name || "user"}.pdf`);
  };

  // Export Word
  const exportAsWord = async () => {
    const paragraphs = [
      new Paragraph({
        children: [new TextRun({ text: "User Details", bold: true })],
      }),
      ...Object.entries(user).map(
        ([key, value]) =>
          new Paragraph({
            children: [new TextRun({ text: `${key}: ${String(value)}` })],
          })
      ),
    ];

    const doc = new Document({ sections: [{ children: paragraphs }] });
    const blob = await Packer.toBlob(doc);

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.name || "user"}.docx`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f11] text-gray-900 dark:text-gray-200 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <UserCircle2 className="text-gray-400 dark:text-gray-300" size={32} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {user.name || "User Details"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Detailed profile view
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition w-full sm:w-auto"
          >
            <Download size={16} /> Export
          </button>

          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition w-full sm:w-auto"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-[#151517] border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-md mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Profile Picture */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
            {profilePic ? (
              <img
                src={profilePic}
                alt={user.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <ImageOff size={40} className="text-gray-500 dark:text-gray-300" />
              </div>
            )}
          </div>

          {/* Basic info */}
          <div className="text-center sm:text-left w-full sm:flex-1">
            <h2 className="text-2xl font-semibold">
              {user.name || "Unnamed User"}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm">
              <Mail size={16} /> {user.email || "No Email"}
            </p>

            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm">
              <Shield size={16} /> Role:{" "}
              <span className="capitalize">{user.role || "user"}</span>
            </p>

            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm">
              <Calendar size={16} /> Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {Object.entries(user).map(([key, value]) => (
          <div
            key={key}
            className="bg-white dark:bg-[#1a1a1c] border border-gray-300 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:border-gray-500 dark:hover:border-gray-500 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {key}
              </span>
              <Hash size={14} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-800 dark:text-gray-200 text-sm break-words">
              {shorten(value)}
            </p>
          </div>
        ))}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#141414] border border-gray-300 dark:border-gray-700 rounded-2xl p-6 w-[90%] max-w-2xl relative">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Export User Details</h2>

            <div className="max-h-[260px] overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-[#1a1a1c] text-sm">
              <pre className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <button
                onClick={exportAsJSON}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <FileType size={16} /> JSON
              </button>

              <button
                onClick={exportAsPDF}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <FileDown size={16} /> PDF
              </button>

              <button
                onClick={exportAsWord}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <FileText size={16} /> Word
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
