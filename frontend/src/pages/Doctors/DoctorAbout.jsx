import { formateDate } from "../../utils/formateDate";

const DoctorAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2  ">
          About of
          <span className="text-irisBlueColor font-semibold text-[24px] leading-9 ">
            Jay narayan tamrakar
          </span>
        </h3>

        <p className="text__para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quis a
          cupiditate numquam corrupti repellat unde. Error repellat rerum libero
          nisi mollitia harum consectetur suscipit. Itaque maxime voluptates est
          accusantium esse quia ducimus inventore exercitationem molestiae
          minus? Ratione esse eaque minima, maiores reprehenderit nisi expedita
          maxime, distinctio recusandae tempore similique.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h2>

        <ul className="pt-4 md:p-5 ">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("03-04-2010")} - {formateDate("12-04-2012")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in life science
              </p>
            </div>
            <p className="text-[16px] leading-5 font-medium text-textColor">
              Devi ahilya university indore
            </p>
          </li>

          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("12-04-1990")} - {formateDate("04-20-1994")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in life science
              </p>
            </div>
            <p className="text-[16px] leading-5 font-medium text-textColor">
              Devi ahilya university indore
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h2>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold ">
              {formateDate("12-04-2010")} - {formateDate("12-04-2010")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. doctor
            </p>

            <p className="text-[14px] leading-6 font-medium text-textColor">
              Devi ahilya university uk
            </p>
          </li>

          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold ">
              {formateDate("12-04-2010")} - {formateDate("12-04-2010")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. doctor
            </p>

            <p className="text-[14px] leading-6 font-medium text-textColor">
              Devi ahilya university uk
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
